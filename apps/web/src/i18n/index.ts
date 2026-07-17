import type { I18n } from 'vue-i18n'
import type { AppLocale } from './types'
import { createI18n } from 'vue-i18n'
import { DEFAULT_LOCALE } from './constants'
import zhCN from './messages/zh-CN/index'

type LocaleMessages = typeof zhCN

export async function ensureLocaleMessages(_i18n: I18n, _locale: AppLocale): Promise<void> {
  // Only zh-CN is supported; no lazy loading needed.
}

export async function setupI18n(_locale: AppLocale = DEFAULT_LOCALE): Promise<I18n> {
  const i18n = createI18n({
    legacy: false,
    locale: DEFAULT_LOCALE,
    fallbackLocale: DEFAULT_LOCALE,
    messages: {
      [DEFAULT_LOCALE]: zhCN,
    },
  })

  return i18n
}

export type MessageSchema = LocaleMessages

declare module 'vue-i18n' {

  export interface DefineLocaleMessage extends MessageSchema {}
}

let appI18n: I18n | null = null

export function setAppI18n(instance: I18n) {
  appI18n = instance
}

export function getAppI18n(): I18n {
  if (!appI18n)
    throw new Error(`i18n is not initialized`)

  return appI18n
}
