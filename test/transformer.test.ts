import { RootNode, NodeTypes } from '../src/helper'
import { test, expect } from 'vitest'
import { transformerLISP2C } from '../src/transformer'
test('transformer', () => {
  const originalAST: RootNode = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.CallExpression,
        name: 'add',
        params: [
          {
            type: NodeTypes.NumberLiteral,
            value: '2',
          },
          {
            type: NodeTypes.CallExpression,
            name: 'subtract',
            params: [
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
    ],
  }

  const transformedAST = {
    type: NodeTypes.Program,
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'CallExpressionStatement',
          callee: {
            type: 'Identifier',
            name: 'add',
          },
          arguments: [
            {
              type: 'NumberLiteral',
              value: '2',
            },
            {
              type: 'CallExpressionStatement',
              callee: {
                type: 'Identifier',
                name: 'subtract',
              },
              arguments: [
                {
                  type: 'NumberLiteral',
                  value: '4',
                },
                {
                  type: 'NumberLiteral',
                  value: '2',
                },
              ],
            },
          ],
        },
      },
    ],
  }

  expect(transformerLISP2C(originalAST)).toEqual(transformedAST)
})
