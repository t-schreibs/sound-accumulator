import { QuartzComponentConstructor, QuartzComponentProps } from "../types"
import style from "../styles/listPage.scss"
import { PageList } from "../PageList"
import { FullSlug, simplifySlug } from "../../util/path"

function DefaultTrackIntro() {
    return "Default track intro";
}
function DefaultTrackAbout() {
    return "Default track about";
}
function TrackContent(props: QuartzComponentProps) {
    const { fileData } = props
    const slug = fileData.slug!
    const release = fileData.release!;
    const intro = fileData.intro;
    const about = fileData.about;
    const artist = simplifySlug(slug as FullSlug).split('/')[1];

    return (
        <div class="popover-hint">
            <article>
                <p>{intro ?? DefaultTrackIntro()}</p>
                <table>
                    <tr>
                        <td><b>Artist</b></td>
                        <td>{artist}</td>
                    </tr>
                    <tr>
                        <td><b>Release</b></td>
                        <td>{release}</td>
                    </tr>
                </table>
                <h2>About</h2>
                <p>{about ?? DefaultTrackAbout()}</p>
            </article>
        </div>
    )
}

TrackContent.css = style + PageList.css
export default (() => TrackContent) satisfies QuartzComponentConstructor