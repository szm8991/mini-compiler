export enum TokenTypes {
  Paren,
  Name,
  Number,
  String,
}

export interface Token {
  type: TokenTypes
  value: string
}

export enum NodeTypes {
  NumberLiteral = 'NumberLiteral',
  Program = 'Program',
  StringLiteral = 'StringLiteral',
  CallExpression = 'CallExpression',
  ExpressionStatement = 'ExpressionStatement',
  CallExpressionStatement = 'CallExpressionStatement',
}

export type ChildNode =
  | NumberLiteralNode
  | CallExpressionNode
  | StringLiteralNode
  | ExpressionStatement
  | CallExpressionStatement

export interface Node {
  type: NodeTypes
}

export interface NumberLiteralNode extends Node {
  type: NodeTypes.NumberLiteral
  value: string
}

export interface StringLiteralNode extends Node {
  value: string
  type: NodeTypes.StringLiteral
}

export interface CallExpressionNode extends Node {
  name: string
  params: ChildNode[]
  type: NodeTypes.CallExpression
  context?: ChildNode[]
}
export interface Callee {
  type: string
  name: string
}
export interface CallExpressionStatement extends Node {
  type: NodeTypes.CallExpressionStatement
  callee: Callee
  arguments: (NumberLiteralNode | CallExpressionStatement)[]
}
export interface ExpressionStatement extends Node {
  type: NodeTypes.ExpressionStatement
  expression: CallExpressionStatement
}

export interface RootNode extends Node {
  body: ChildNode[]
  type: NodeTypes.Program
  context?: ChildNode[]
}

export function createStringLiteralNode(value: string): StringLiteralNode {
  return {
    type: NodeTypes.StringLiteral,
    value,
  }
}

export function createRootNode(): RootNode {
  return {
    type: NodeTypes.Program,
    body: [],
  }
}

export function createNumberLiteralNode(value: string): NumberLiteralNode {
  return {
    type: NodeTypes.NumberLiteral,
    value,
  }
}

export function createCallExpression(name: string): CallExpressionNode {
  return {
    type: NodeTypes.CallExpression,
    name,
    params: [],
  }
}
