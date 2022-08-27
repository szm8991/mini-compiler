import { test, expect } from 'vitest'
import { compiler } from '../src/compiler'
import { compiler as compiler2 } from '../dist/index'
test('compiler', () => {
  const code = `(add 2 (subtract 4 2))`
  expect(compiler(code)).toBe('add(2, subtract(4, 2));')
})

test('dist compiler', () => {
  const code = `(add 2 (subtract 4 2))`
  expect(compiler2(code)).toBe('add(2, subtract(4, 2));')
})
