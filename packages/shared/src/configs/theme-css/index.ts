/** CSS theme strings for JavaScript consumers */

import baseCSS from './base.css?raw'
import defaultCSS from './default.css?raw'
import graceCSS from './grace.css?raw'
import simpleCSS from './simple.css?raw'
import soulstationCSS from './soulstation.css?raw'

export const baseCSSContent = baseCSS

export const themeMap = {
  soulstation: soulstationCSS,
  default: defaultCSS,
  grace: graceCSS,
  simple: simpleCSS,
} as const

export type BuiltinThemeName = keyof typeof themeMap

/** Built-in theme id. */
export type ThemeName = BuiltinThemeName

export function isBuiltinThemeName(name: string): name is BuiltinThemeName {
  return Object.keys(themeMap).includes(name)
}
