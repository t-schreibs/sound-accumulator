import { slugAnchor } from "./path"

// !?               -> optional embedding
// \[\[             -> open brace
// ([^\[\]\|\#]+)   -> one or more non-special characters ([,],|, or #) (name)
// (#[^\[\]\|\#]+)? -> # then one or more non-special characters (heading link)
// (|[^\[\]\|\#]+)? -> | then one or more non-special characters (alias)
const wikilinkRegex = new RegExp(/!?\[\[([^\[\]\|\#]+)?(#[^\[\]\|\#]+)?(\|[^\[\]\|\#]+)?\]\]/, "g")

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