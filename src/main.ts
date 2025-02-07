/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App).use(store)
app.use(VueAxios)
app.use(axios)

registerPlugins(app)

app.mount('#app')

