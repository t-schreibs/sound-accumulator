import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types";

export default ((children?: QuartzComponent[]) => {
  if (children) {
    return function Column(props: QuartzComponentProps) {
      return <div class={`column ${props.displayClass ?? ""}`}>
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