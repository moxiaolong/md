import { describe, expect, it } from 'vitest'
import { getDefaultContent } from './default-content'

describe(`getDefaultContent`, () => {
  it(`returns zh-CN sample article`, () => {
    const content = getDefaultContent()
    expect(content).toContain(`SoulStation`)
    expect(content).toContain(`Markdown`)
  })
})