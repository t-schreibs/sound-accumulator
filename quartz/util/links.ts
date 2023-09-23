// !?               -> optional embedding
// \[\[             -> open brace
// ([^\[\]\|\#]+)   -> one or more non-special characters ([,],|, or #) (name)
// (#[^\[\]\|\#]+)? -> # then one or more non-special characters (heading link)

import { slugAnchor } from "./path"

// (|[^\[\]\|\#]+)? -> | then one or more non-special characters (alias)
const wikilinkRegex = new RegExp(/!?\[\[([^\[\]\|\#]+)?(#[^\[\]\|\#]+)?(\|[^\[\]\|\#]+)?\]\]/, "g")
const highlightRegex = new RegExp(/==([^=]+)==/, "g")
const commentRegex = new RegExp(/%%(.+)%%/, "g")
// from https://github.com/escwxyz/remark-obsidian-callout/blob/main/src/index.ts
const calloutRegex = new RegExp(/^\[\!(\w+)\]([+-]?)/)
const calloutLineRegex = new RegExp(/^> *\[\!\w+\][+-]?.*$/, "gm")
// (?:^| )              -> non-capturing group, tag should start be separated by a space or be the start of the line
// #(...)               -> capturing group, tag itself must start with #
// (?:[-_\p{L}])+       -> non-capturing group, non-empty string of (Unicode-aware) alpha-numeric characters, hyphens and/or underscores
// (?:\/[-_\p{L}]+)*)   -> non-capturing group, matches an arbitrary number of tag strings separated by "/"
const tagRegex = new RegExp(/(?:^| )#((?:[-_\p{L}\d])+(?:\/[-_\p{L}\d]+)*)/, "gu")

export function formatLinks(src: string) {
    return src.replaceAll(wikilinkRegex, (value, ...capture) => {
        const [rawFp, rawHeader, rawAlias] = capture
        const fp = rawFp ?? ""
        const anchor = rawHeader?.trim().slice(1)
        const displayAnchor = anchor ? `#${slugAnchor(anchor)}` : ""
        const displayAlias = rawAlias ?? rawHeader?.replace("#", "|") ?? ""
        const embedDisplay = value.startsWith("!") ? "!" : ""
        return `${embedDisplay}[[${fp}${displayAnchor}${displayAlias}]]`
      })
}