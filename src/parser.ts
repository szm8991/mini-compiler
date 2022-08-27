import {
  createRootNode,
  createStringLiteralNode,
  createNumberLiteralNode,
  createCallExpression,
} from './helper'
import { Token, TokenTypes } from './tokenizer'

export function parser(tokens: Token[]) {
  const root = createRootNode()

  let current = 0

  function walk() {
    let token = tokens[current]
    if (token.type === TokenTypes.Number) {
      current++
      return createNumberLiteralNode(token.value)
    }

    if (token.type === TokenTypes.String) {
      current++
      return createStringLiteralNode(token.value)
    }

    if (token.type === TokenTypes.Paren && token.value === '(') {
      token = tokens[++current]
      let node = createCallExpression(token.value)
      token = tokens[++current]
      while (!(token.type === TokenTypes.Paren && token.value === ')')) {
        node.params.push(walk())
        token = tokens[current]
      }
      current++
      return node
    }

    throw new Error(`识别不了的 token: ${token}`)
  }

  while (current < tokens.length) {
    root.body.push(walk())
  }

  return root
}
