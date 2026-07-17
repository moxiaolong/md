import { browser, defineBackground } from '#imports'
import zhCN from '@/i18n/messages/zh-CN/store'

export default defineBackground({
  type: `module`,
  main() {
    browser.runtime.onInstalled.addListener((detail) => {
      if (import.meta.env.COMMAND === `serve`) {
        browser.runtime.openOptionsPage()
        return
      }
      if (detail.reason === `install`) {
        browser.runtime.openOptionsPage()
      }
      else if (detail.reason === `update`) {
        browser.runtime.openOptionsPage()
      }
    })

    browser.runtime.onInstalled.addListener(() => {
      if (typeof browser.sidePanel === `undefined`)
        return
      browser.contextMenus.create({
        id: `openSidePanel`,
        title: zhCN.extension.editorTitle,
        documentUrlPatterns: [`https://mp.weixin.qq.com/cgi-bin/appmsg*`],
        contexts: [`all`],
      })
    })

    browser.contextMenus.onClicked.addListener((info, tab) => {
      if (info.menuItemId === `openSidePanel` && tab?.id)
        browser.sidePanel.open({ tabId: tab.id })
    })
  },
})
