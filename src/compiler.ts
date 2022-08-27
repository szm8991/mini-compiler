import { tokenizer } from './tokenizer'
import { parser } from './parser'
import { transformer, TransformOptions, transformerLISP2C } from './transformer'
import { codegen } from './codegen'
export function compiler(code: string, options?: TransformOptions): string {
  const tokens = tokenizer(code)
  const ast = parser(tokens)
  transformerLISP2C
  if (options) return codegen(transformer(ast, options))
  else return codegen(transformerLISP2C(ast))
}
