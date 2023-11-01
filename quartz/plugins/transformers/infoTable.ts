import { QuartzTransformerPlugin } from "../types"
import { visit } from 'unist-util-visit'

export const InfoTable: QuartzTransformerPlugin = () => {
    return {
        name: "TracksOnReleasePage",
        markdownPlugins() {
            return [
                () => {
                    return (tree, file) => {
                        if (file.data.frontmatter?.table) {
                            let toReplace: any;
                            visit(tree, 'text', (node, _, parent) => {
                                if (node.value.includes("${infoTable}")) {
                                    toReplace = parent;
                                }
                            });
                            if (toReplace !== undefined) {
                                visit(tree, 'paragraph', (node, _, parent) => {
                                    if (node === toReplace) {
                                        parent.children = parent.children?.map(
                                            child => child === toReplace ? {
                                                type: 'table',
                                                children: [{
                                                    type: 'tableRow',
                                                    children: [
                                                        {
                                                            type: 'tableCell'
                                                        },
                                                        {
                                                            type: 'tableCell'
                                                        }
                                                    ]
                                                }].concat(Object.keys(file.data.frontmatter!.table!).map(
                                                    (key: string) => {
                                                        return {
                                                            type: 'tableRow',
                                                            children: [
                                                                {
                                                                    type: 'tableCell',
                                                                    children: [
                                                                        {
                                                                            type: 'strong',
                                                                            children: [
                                                                                {
                                                                                    type: 'text', 
                                                                                    value: key
                                                                                }
                                                                            ]
                                                                        }  
                                                                    ]
                                                                },
                                                                {
                                                                    type: 'tableCell',
                                                                    children: [
                                                                        {
                                                                            type: 'text', 
                                                                            value: file.data.frontmatter!.table[key]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ))
                                            } :
                                            child)
                                    }
                                })
                            }
                        }
                    }
                }
            ]
        }
    }
}