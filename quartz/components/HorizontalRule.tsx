import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface HorizontalRuleOptions {
  invisible: boolean
}

const defaultOptions: HorizontalRuleOptions = {
  invisible: false
}

export default ((opts?: Partial<HorizontalRuleOptions>) => {
  function HorizontalRule({ displayClass }: QuartzComponentProps) {
    return <div class={displayClass ?? ''}>
          <hr class={opts?.invisible ? 'hr-invisible' : ''}/>
      </div>
  }
  return HorizontalRule
}) satisfies QuartzComponentConstructor