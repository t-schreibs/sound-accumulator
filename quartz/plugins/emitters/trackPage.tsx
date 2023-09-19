import { QuartzEmitterPlugin } from "../types"
import { QuartzComponentProps } from "../../components/types"
import HeaderConstructor from "../../components/Header"
import BodyConstructor from "../../components/Body"
import { pageResources, renderPage } from "../../components/renderPage"
import { FullPageLayout } from "../../cfg"
import {
  FilePath,
  FullSlug,
  joinSegments,
  pathToRoot,
  slugifyFilePath,
} from "../../util/path"
import { defaultListPageLayout, sharedPageComponents } from "../../../quartz.layout"
import { TrackContent } from "../../components"
import { Data } from "vfile"
import { TrackEntry } from "../transformers/trackLinksOnReleasePage"
import { defaultProcessedContent } from "../vfile"

export const TrackPage: QuartzEmitterPlugin<FullPageLayout> = (userOpts) => {
  const opts: FullPageLayout = {
    ...sharedPageComponents,
    ...defaultListPageLayout,
    pageBody: TrackContent(),
    ...userOpts,
  }

  const { head: Head, header, beforeBody, pageBody, left, right, footer: Footer } = opts
  const Header = HeaderConstructor()
  const Body = BodyConstructor()

  return {
    name: "TrackPage",
    getQuartzComponents() {
      return [Head, Header, Body, ...header, ...beforeBody, pageBody, ...left, ...right, Footer]
    },
    async emit(ctx, content, resources, emit): Promise<FilePath[]> {
      const fps: FilePath[] = []
      const allFiles = content.map((c) => c[1].data)
      const cfg = ctx.cfg.configuration
      allFiles.forEach(
        (data: Data) => {
            if (data.frontmatter?.tracks) {
                (data.frontmatter.tracks! as TrackEntry[]).forEach(
                    async track => {
                        const slug = slugifyFilePath(joinSegments(data.slug as string, track.name) as FilePath);
                        const externalResources  = pageResources(pathToRoot(slug), resources);
                        const [tree, file] = defaultProcessedContent({
                            slug: slug,
                            frontmatter: { 
                                title: track.name,
                                tags: ['track']
                            },
                            intro: track.intro,
                            about: track.about,
                            release: data.frontmatter?.title
                          });
                        const componentData: QuartzComponentProps = {
                            fileData: file.data,
                            externalResources,
                            cfg,
                            children: [],
                            tree,
                            allFiles
                        }
                        const content = renderPage(slug, componentData, opts, externalResources);
                        const fp = await emit({
                            content,
                            slug: slug,
                            ext: ".html",
                          });
                          fps.push(fp);
                    });
            }
        }
      )
      return fps
    },
  }
}