import type { AppLocale, LocaleOption } from './types'

export const LOCALE_STORAGE_KEY = `locale`

export const DEFAULT_LOCALE: AppLocale = `zh-CN`

/**
 * Fixed BCP 47 tag on editor/preview so system-font fallback stays stable when
 * `html[lang]` follows the UI locale. Use `und` (undetermined) instead of a
 * concrete locale so assistive tech is not told the wrong content language.
 */
export const CONTENT_FONT_LANG = `und` as const

export const SUPPORTED_LOCALES: AppLocale[] = [`zh-CN`]

export const LOCALE_OPTIONS: LocaleOption[] = [
  { value: `zh-CN`, labelKey: `locale.zhCN`, shortLabel: `简` },
]

export function getNextLocale(_current: AppLocale): AppLocale {
  return `zh-CN`
}

export function getLocaleOption(_locale: AppLocale): LocaleOption {
  return LOCALE_OPTIONS[0]!
}

export function isAppLocale(value: string | null | undefined): value is AppLocale {
  return value === `zh-CN`
}
