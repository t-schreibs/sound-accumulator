import { QuartzComponentConstructor, QuartzComponentProps } from "../types"
import style from "../styles/listPage.scss"
import { PageList } from "../PageList"
import { FilePath, FullSlug, pathToRoot, simplifySlug, slugifyFilePath } from "../../util/path"
import { formatLinks, getLinkInfo } from "../../util/links";

function ordinal_suffix_of(i: number) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

function DefaultTrackIntro(title: string, release: string, releaseType: string, artist: string, index: number) {
    return `${title} is the ${ordinal_suffix_of(index + 1)} track from ${artist}'s ${releaseType} ${release}.`;
}
function DefaultTrackAbout(title: string, published: string) {
    return `${title} was published on ${published}.`;
}
function TrackContent(props: QuartzComponentProps) {
    const { fileData } = props
    const slug = fileData.slug!
    const release = fileData.release as string;
    const releaseType = fileData.releaseType as string;
    const intro = fileData.intro;
    const about = fileData.about;
    const title = fileData.frontmatter!.title;
    const index = fileData.index as number;
    const published = fileData.published as string
    const externalLinks = (fileData.externalLinks as string)?.split(',') ?? [];
    const artist = simplifySlug(slug as FullSlug).split('/')[1].replace('-', ' ');

    return (
        <div class="popover-hint">
            <article>
                <p>{intro ?? DefaultTrackIntro(title, release, releaseType, artist, index)}</p>
                <table>
                    <tr>
                        <td><b>Artist</b></td>
                        <td><a class="internal" href={slugifyFilePath(`${pathToRoot(slug)}/artists/${artist}` as FilePath)}>{artist}</a></td>
                    </tr>
                    <tr>
                        <td><b>Release</b></td>
                        <td><a class="internal" href={slugifyFilePath(`${pathToRoot(slug)}/releases/${artist}/${release}` as FilePath)}>{release}</a></td>
                    </tr>
                    <tr>
                        <td><b>Published</b></td>
                        <td>{published ?? "Not available"}</td>
                    </tr>
                    <tr>
                        <td><b>Links</b></td>
                        <td>
                            {
                                externalLinks.map(
                                    (link, _, array) => {
                                        let linkInfo = getLinkInfo(formatLinks(link));
                                    return <span><a href={linkInfo.Url}>{linkInfo.Alias ?? linkInfo.Url}</a>{array.indexOf(link) + 1 < array.length ? ', ' : ''}</span>
                                })
                            }
                        </td>
                    </tr>
                </table>
                <h2>About</h2>
                <p>{about ?? DefaultTrackAbout(title, published)}</p>
            </article>
        </div>
    )
}

TrackContent.css = style + PageList.css
export default (() => TrackContent) satisfies QuartzComponentConstructor