import { Data } from "vfile";
import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

function recentPostFilter(f: Data): boolean { return f.frontmatter?.excludeFromRecent != true ?? true; }
function blogPostsFilter(f: Data): boolean { return f.frontmatter?.tags.includes('blog') === true ?? false }

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
  beforeBody: [
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Column(
      [
        Component.Search(),
        Component.Row(
          [
            Component.Darkmode(),
            Component.RandomPageButton()
          ]
        )
      ]
    ),
    Component.DesktopOnly(Component.RecentNotes(
      { 
        title: "Recent", 
        limit: 5, 
        filter: recentPostFilter
      }))
  ],
  right: [
    Component.Graph({ localGraph: { depth: 2 }, globalGraph: {} }),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
  afterBody: [
    Component.LinkList(), 
    Component.MobileOnly(Component.HorizontalRule()),
    Component.MobileOnly(Component.RecentNotes(
    {
      title: "Recent",
      limit: 3, 
      filter: recentPostFilter
    }
    )),
    Component.OnlyFor({ title: "Sound Accumulator" }, Component.RecentNotes(
      {
        title: "Blog",
        limit: 5,
        showTags: false,
        filter: blogPostsFilter
      }
    ))]
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Column(
      [
        Component.Search(),
        Component.Row(
          [
            Component.Darkmode(),
            Component.RandomPageButton()
          ]
        )
      ]
    ),
    Component.DesktopOnly(Component.RecentNotes(
      { 
        title: "Recent", 
        limit: 5, 
        filter: recentPostFilter
      }))
  ],
  right: [],
  afterBody: []
}
