import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, SimpleSlug, resolveRelative } from "../util/path"
import style from "./styles/recentNotes.scss"
import { Date, getDate } from "./Date"

function LinkList(props: QuartzComponentProps) { 
    return null;
  }
export default (() => LinkList) satisfies QuartzComponentConstructor
