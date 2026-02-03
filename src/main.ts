import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import { piniaLocalStoragePersistPlugin } from './plugins/piniaLocalStoragePersist'

import 'element-plus/dist/index.css'

const pinia = createPinia()
pinia.use(piniaLocalStoragePersistPlugin)

const app = createApp(App)
app.use(pinia)
app.mount('#app')
