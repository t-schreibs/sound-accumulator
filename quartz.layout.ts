import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      Discuss: "https://github.com/t-schreibs/sound-accumulator/discussions",
      Contribute: "https://soundaccumulator.com/contribute",
      RSS: "https://soundaccumulator.com/index.xml"
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle(), Component.ContentMeta(), Component.TagList()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.DesktopOnly(Component.RecentNotes(
      { 
        title: "Recent", 
        limit: 5, filter: 
        (f) => f.frontmatter?.excludeFromRecent != true ?? true 
      }))
  ],
  right: [Component.Graph({ localGraph: { depth: 2 }, globalGraph: {} }), Component.Backlinks()],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.RecentNotes(
      { 
        title: "Recent", 
        limit: 5, filter: 
        (f) => f.frontmatter?.excludeFromRecent != true ?? true 
      }))
  ],
  right: [],
}
