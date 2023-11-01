import path from "path"
import { FilePath, slugAnchor, slugifyFilePath } from "./path"

// !?               -> optional embedding
// \[\[             -> open brace
// ([^\[\]\|\#]+)   -> one or more non-special characters ([,],|, or #) (name)
// (#[^\[\]\|\#]+)? -> # then one or more non-special characters (heading link)
// (|[^\[\]\|\#]+)? -> | then one or more non-special characters (alias)
export const WikilinkRegex = new RegExp(/!?\[\[([^\[\]\|\#]+)?(#[^\[\]\|\#]+)?(\|[^\[\]\|\#]+)?\]\]/, "g")
export interface LinkInfo {
  Type: string,
  Url: string,
  Alias?: string,
  FilePath?: string,
  Dimensions?: {
    Width: string,
    Height: string
  }
  Anchor?: string,
  Block?: string
}

export function formatLinks(src: string) {
  return src.replaceAll(WikilinkRegex, (value, ...capture) => {
    const [rawFp, rawHeader, rawAlias] = capture
    const fp = rawFp ?? ""
    const anchor = rawHeader?.trim().slice(1)
    const displayAnchor = anchor ? `#${slugAnchor(anchor)}` : ""
    const displayAlias = rawAlias ?? rawHeader?.replace("#", "|") ?? ""
    const embedDisplay = value.startsWith("!") ? "!" : ""
    return `${embedDisplay}[[${fp}${displayAnchor}${displayAlias}]]`
  })
}

function getRawFilePathAndAlias(linkText: string): {rawFilePath: string, rawAlias: string} { 
  let innerText = linkText.replaceAll('[', '').replaceAll(']', '');
  let sections = innerText.split('|').map(
    section => section.trim()
  );
  return { 
    rawFilePath: sections[0], 
    rawAlias: sections[1]
  };
}

export function getLinkInfo(linkText: string, rawFilePath?: string, rawHeader?: string, rawAlias?: string): LinkInfo {
  const retrievedInfo = getRawFilePathAndAlias(linkText);
  const fp = (rawFilePath ?? retrievedInfo.rawFilePath)?.trim() ?? ""
  const anchor = rawHeader?.trim() ?? ""
  const alias = (rawAlias?.slice(1) ?? retrievedInfo.rawAlias)?.trim()

  // embed cases
  if (linkText.startsWith("!")) {
    const ext: string = path.extname(fp).toLowerCase()
    const url = slugifyFilePath(fp as FilePath)
    if ([".png", ".jpg", ".jpeg", ".gif", ".bmp", ".svg"].includes(ext)) {
      const dims = alias ?? ""
      let [width, height] = dims.split("x", 2)
      width ||= "auto"
      height ||= "auto"
      return {
        Type: "image",
        Url: url,
        Dimensions: {
          Width: width,
          Height: height
        }
      }
    } else if ([".mp4", ".webm", ".ogv", ".mov", ".mkv"].includes(ext)) {
      return {
        Type: "video",
        Url: url
      }
    } else if (
      [".mp3", ".webm", ".wav", ".m4a", ".ogg", ".3gp", ".flac"].includes(ext)
    ) {
      return {
        Type: "audio",
        Url: url
      }
    } else if ([".pdf"].includes(ext)) {
      return {
        Type: "pdf",
        Url: url
      }
    } else if (ext === "") {
      return {
        Type: "embed",
        Url: url,
        Anchor: anchor,
        Block: anchor.slice(1)
      }
    }
    // otherwise, fall through to regular link
  }

  // internal link
  const url = fp + anchor
  return {
    Type: "link",
    Url: url,
    Alias: alias,
    FilePath: fp
  }
}