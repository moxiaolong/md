import { createApp } from 'vue'
import { setAppI18n, setupI18n } from '@/i18n/index'
import App from './App.vue'

import '@/assets/index.css'
import '@/assets/less/theme.less'

async function main() {
  const i18n = await setupI18n()
  setAppI18n(i18n)
  createApp(App).use(i18n).mount(`#app`)
}

void main()
