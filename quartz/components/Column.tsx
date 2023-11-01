import { getFlexContainer } from "../util/componentGrid";
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types";

export default ((children?: QuartzComponent[]) => {
  if (children) {
    return getFlexContainer(children!, 'column');
  }
  else {
    return () => <></>
  }
}) satisfies QuartzComponentConstructor