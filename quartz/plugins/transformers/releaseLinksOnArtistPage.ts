import { QuartzTransformerPlugin } from "../types"
import {
    FullSlug,
    RelativeURL,
    SimpleSlug,
    TransformOptions,
    _stripSlashes,
    simplifySlug,
    splitAnchor,
    transformLink,
} from "../../util/path"
import path from "path"
import { visit } from "unist-util-visit"
import isAbsoluteUrl from "is-absolute-url"

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
                        if (file.data.slug?.startsWith('artists/')) {
                            let allFiles: FullSlug[] = ctx.allSlugs;
                            //Use allFiles to create the appropriate links if the current file is an artist.
                            console.warn(`Found artist: ${file.data.slug}`);
                        }
                    }
                },
            ]
        },
    }
}
