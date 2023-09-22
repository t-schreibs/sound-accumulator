import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FilePath, slugifyFilePath } from "../util/path"
import { Data } from "vfile"

function LinkList(props: QuartzComponentProps) {
  let allFiles = props.allFiles;
  let data = props.fileData;
  let tags = data.frontmatter?.tags;
  let links: Data[] = [];
  let header = "Releases";
  if (tags?.includes('artist') ?? false) {
    links = allFiles.filter(file => 
      file.filePath?.includes(`releases/${data.frontmatter?.title ?? data.filePath}`));
  }
  else if (tags?.includes('genre') ?? false) {
    links = allFiles.filter(file => 
      file.frontmatter?.tags?.includes('artist') && file.frontmatter?.table?.Genres?.includes(`[[genres/${data.frontmatter?.title}]]`));
      header = "Artists";
  }
  if (links.length > 0) {
    return <div>
    <h2>{header}</h2>
    <ul>
      {links.map(
        file => (<li><a class="internal" href={slugifyFilePath(`../${file.filePath?.replace('content/', '')}` as FilePath)}>
          {file.frontmatter?.title}
        </a></li>)
      )}
    </ul>
  </div>
  }
  return null
}
export default (() => LinkList) satisfies QuartzComponentConstructor
