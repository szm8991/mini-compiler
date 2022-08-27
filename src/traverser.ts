import { ChildNode, NodeTypes, RootNode, CallExpressionNode } from './helper'

type ParentNode = RootNode | CallExpressionNode | undefined
type MethodFn = (node: RootNode | ChildNode, parent: ParentNode) => void
interface VisitorOption {
  enter: MethodFn
  exit?: MethodFn
}
export interface Visitor {
  Program?: VisitorOption
  NumberLiteral?: VisitorOption
  CallExpression?: VisitorOption
  StringLiteral?: VisitorOption
  CallExpressionStatement?: VisitorOption
  ExpressionStatement?: VisitorOption
}

export function traverser(rootNode: RootNode, visitor: Visitor) {
  // 遍历树 深度优先搜索
  function traverChildren(children: ChildNode[], parent: ParentNode) {
    children.forEach(node => {
      traverNode(node, parent)
    })
  }

  function traverNode(node: RootNode | ChildNode, parent?: ParentNode) {
    // enter
    const methods = visitor[node.type]
    if (methods) {
      methods.enter(node, parent)
    }

    switch (node.type) {
      case NodeTypes.Program:
        traverChildren(node.body, node)
        break
      case NodeTypes.CallExpression:
        traverChildren(node.params, node)
        break
      case NodeTypes.NumberLiteral:
        break
      default:
        break
    }

    // exit
    if (methods && methods.exit) {
      methods.exit(node, parent)
    }
  }
  traverNode(rootNode)
}
