import { QuartzTransformerPlugin } from "../types"
import { visit } from 'unist-util-visit'

export interface TrackEntry {
  name: string
  intro?: string
  about?: string
}

export const TrackLinksOnReleasePage: QuartzTransformerPlugin = () => {
  return {
    name: "TracksOnReleasePage",
    markdownPlugins() {
      return [
        () => {
          return (tree, file) => {
            if (file.data?.frontmatter?.tracks) {
              visit(tree, "root", (root) => {
                root.children.push(
                  {
                    type: 'heading',
                    depth: 2,
                    children: [
                      {
                        type: 'text',
                        value: 'Tracks'
                      }
                    ]
                  },
                  {
                    type: 'list',
                    children: file.data!.frontmatter!.tracks.map(
                      (track: TrackEntry) => {
                        return {
                          type: 'listItem',
                          children: [
                            {
                              type: 'link',
                              url: `${file.data.slug}/${track.name}`,
                              title: track.name,
                              children: [
                                {
                                  type: 'text',
                                  value: track.name
                                }
                              ]
                            }
                          ]
                        }
                      }
                    )
                  }
                );
              });
            }
          }
        }
      ]
    }
  }
}