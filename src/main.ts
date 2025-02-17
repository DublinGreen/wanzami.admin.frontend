/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { DefaultApolloClient, provideApolloClient } from '@vue/apollo-composable';
import { authApolloClient, dataApolloClient } from './apollo';

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

import store from './store';
const app = createApp(App).use(store)

app.provide(DefaultApolloClient, authApolloClient);
app.provide('apolloDataClient', dataApolloClient); // Custom key for second client

registerPlugins(app)

app.mount('#app')