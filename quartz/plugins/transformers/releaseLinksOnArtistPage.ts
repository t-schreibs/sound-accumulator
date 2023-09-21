import { QuartzTransformerPlugin } from "../types"
import {
    FilePath,
    FullSlug,
    TransformOptions,
    _stripSlashes,
    slugifyFilePath,
} from "../../util/path"
import { visit } from "unist-util-visit"

interface Options {
    /** How to resolve Markdown paths */
    markdownLinkResolution: TransformOptions["strategy"]
    /** Strips folders from a link so that it looks nice */
    prettyLinks: boolean
}

const defaultOptions: Options = {
    markdownLinkResolution: "absolute",
    prettyLinks: true,
}

export const ReleaseLinksOnArtistPage: QuartzTransformerPlugin<Partial<Options> | undefined> = (userOpts) => {
    const opts = { ...defaultOptions, ...userOpts }
    return {
        name: "ReleaseLinksOnArtistPage",
        htmlPlugins(ctx) {
            return [
                () => {
                    return (tree, file) => {
                        let slugSegments = file.data.slug?.split('/') ?? ['{no slug here}'];
                        if (slugSegments[0] === 'artists' && !slugSegments.includes('index')) {
                            let releaseSlugs: FullSlug[] = ctx.allSlugs.filter(
                                slug => slug.startsWith(`releases/${slugSegments.at(-1)}`)
                            );
                            console.warn(releaseSlugs);
                            visit(tree, "root", (root) => {
                                root.children.push(
                                    {
                                        type: 'element',
                                        tagName: 'h2',
                                        children: [
                                            {
                                                type: 'text',
                                                value: 'Releases'
                                            }
                                        ]
                                    },
                                    {
                                        type: 'element',
                                        tagName: 'ul',
                                        children: releaseSlugs.map(
                                            (releaseSlug: FullSlug) => {
                                                return {
                                                    type: 'element',
                                                    tagName: 'li',
                                                    children: [
                                                        {
                                                            type: 'element',
                                                            tagName: 'a',
                                                            properties: {
                                                                href: '../' + releaseSlug
                                                            },
                                                            children: [
                                                                {
                                                                    type: 'text',
                                                                    value: releaseSlug.split('/').at(-1)
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            }
                                        )
                                    }
                                )
                            });
                        }
                    }
                },
            ]
        },
    }
}
