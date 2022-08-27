import { ChildNode, RootNode } from './helper'

export function codegen(ast: ChildNode | RootNode): string {
  switch (ast.type) {
    case 'Program':
      return ast.body.map(codegen).join('')
    case 'ExpressionStatement':
      return codegen(ast.expression) + ';'
    case 'NumberLiteral':
      return ast.value
    case 'CallExpressionStatement':
      return ast.callee.name + '(' + ast.arguments.map(codegen).join(', ') + ')'
  }
  return ''
}
