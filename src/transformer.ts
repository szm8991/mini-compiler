import {
  CallExpressionStatement,
  createRootNode,
  ExpressionStatement,
  NodeTypes,
  RootNode,
} from './helper'
import { traverser, Visitor } from './traverser'
export interface TransformOptions {
  visitor: Visitor
}
export function transformer(ast: RootNode, options: TransformOptions): RootNode {
  const newAst = createRootNode()

  ast.context = newAst.body

  traverser(ast, options.visitor)

  return newAst
}
export function transformerLISP2C(ast: RootNode) {
  const options: TransformOptions = {
    visitor: {
      CallExpression: {
        enter(node, parent) {
          if (node.type === NodeTypes.CallExpression) {
            let expression: CallExpressionStatement | ExpressionStatement = {
              type: NodeTypes.CallExpressionStatement,
              callee: {
                type: 'Identifier',
                name: node.name,
              },
              arguments: [],
            }
            node.context = expression.arguments
            if (parent?.type !== NodeTypes.CallExpression) {
              expression = {
                type: NodeTypes.ExpressionStatement,
                expression,
              }
            }
            parent?.context?.push(expression)
          }
        },
      },

      NumberLiteral: {
        enter(node, parent) {
          if (node.type === NodeTypes.NumberLiteral) {
            const numberNode: any = {
              type: 'NumberLiteral',
              value: node.value,
            }
            parent?.context?.push(numberNode)
          }
        },
      },
    },
  }

  return transformer(ast, options)
}
