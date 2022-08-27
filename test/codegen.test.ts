import { test, expect } from 'vitest'
import { NodeTypes, RootNode } from '../src/helper'
import { codegen } from '../src/codegen'
test('codegen', () => {
  const ast: RootNode = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.ExpressionStatement,
        expression: {
          type: NodeTypes.CallExpressionStatement,
          callee: {
            type: 'Identifier',
            name: 'add',
          },
          arguments: [
            {
              type: NodeTypes.NumberLiteral,
              value: '2',
            },
            {
              type: NodeTypes.CallExpressionStatement,
              callee: {
                type: 'Identifier',
                name: 'subtract',
              },
              arguments: [
                {
                  type: NodeTypes.NumberLiteral,
                  value: '4',
                },
                {
                  type: NodeTypes.NumberLiteral,
                  value: '2',
                },
              ],
            },
          ],
        },
      },
    ],
  }

  expect(codegen(ast)).toMatchInlineSnapshot('"add(2, subtract(4, 2));"')
})

test('two ExpressionStatement', () => {
  const ast: RootNode = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.ExpressionStatement,
        expression: {
          type: NodeTypes.CallExpressionStatement,
          callee: {
            type: 'Identifier',
            name: 'add',
          },
          arguments: [
            {
              type: NodeTypes.NumberLiteral,
              value: '2',
            },
            {
              type: NodeTypes.CallExpressionStatement,
              callee: {
                type: 'Identifier',
                name: 'subtract',
              },
              arguments: [
                {
                  type: NodeTypes.NumberLiteral,
                  value: '4',
                },
                {
                  type: NodeTypes.NumberLiteral,
                  value: '2',
                },
              ],
            },
          ],
        },
      },
      {
        type: NodeTypes.ExpressionStatement,
        expression: {
          type: NodeTypes.CallExpressionStatement,
          callee: {
            type: 'Identifier',
            name: 'add',
          },
          arguments: [
            {
              type: NodeTypes.NumberLiteral,
              value: '2',
            },
            {
              type: NodeTypes.CallExpressionStatement,
              callee: {
                type: 'Identifier',
                name: 'subtract',
              },
              arguments: [
                {
                  type: NodeTypes.NumberLiteral,
                  value: '4',
                },
                {
                  type: NodeTypes.NumberLiteral,
                  value: '2',
                },
              ],
            },
          ],
        },
      },
    ],
  }

  expect(codegen(ast)).toMatchInlineSnapshot('"add(2, subtract(4, 2));add(2, subtract(4, 2));"')
})
