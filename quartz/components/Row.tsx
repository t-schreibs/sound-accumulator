import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types";

export default ((children?: QuartzComponent[]) => {
  if (children) {
    return function Row(props: QuartzComponentProps) {
      return <div class={`row ${props.displayClass ?? ""}`}>
        {children.map((Component) => (
          <Component {...props} />
        ))}
      </div>
    }
  }
  else {
    return () => <></>
  }
}) satisfies QuartzComponentConstructor