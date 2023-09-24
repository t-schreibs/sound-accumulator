import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/randomPage.inline"
import style from "./styles/randomPage.scss"

export default (() => {
    function RandomPageButton() {
        return (
            <div id="random-page-button" class="random-page">
                <svg y="0px" x="0px" viewBox="0 0 316 316">
                    <title>Random page</title>
                    <g>
                        <rect class="random-page-square" stroke-width="15" rx="30" height="300" width="300" y="8" x="8" fill="none" />
                        <ellipse class="random-page-ellipse" ry="20" rx="20" cy="83" cx="108" />
                        <ellipse class="random-page-ellipse" ry="20" rx="20" cy="83" cx="208" />
                        <ellipse class="random-page-ellipse" ry="20" rx="20" cy="233" cx="208" />
                        <ellipse class="random-page-ellipse" ry="20" rx="20" cy="233" cx="108" />
                        <ellipse class="random-page-ellipse" ry="20" rx="20" cy="158" cx="208" />
                        <ellipse class="random-page-ellipse" ry="20" rx="20" cy="158" cx="108" />
                    </g>
                </svg>
            </div>
        )
    }
    RandomPageButton.css = style
    RandomPageButton.afterDOMLoaded = script
    return RandomPageButton
}) satisfies QuartzComponentConstructor
