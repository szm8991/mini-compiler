import { tokenizer } from './tokenizer'
import { parser } from './parser'
import { transformer, TransformOptions } from './transformer'
import { codegen } from './codegen'
export function compiler(code: string, options: TransformOptions): string {
  const tokens = tokenizer(code)
  const ast = parser(tokens)
  const transformedAst = transformer(ast, options)
  return codegen(transformedAst)
}
