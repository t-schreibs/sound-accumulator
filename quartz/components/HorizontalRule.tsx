import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function HorizontalRule({ displayClass }: QuartzComponentProps) {
  return <div class={displayClass}>
        <hr/>
    </div>
}

export default (() => HorizontalRule) satisfies QuartzComponentConstructor