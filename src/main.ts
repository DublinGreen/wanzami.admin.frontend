/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { ApolloClients } from '@vue/apollo-composable';
import apolloClient from './apolloClient';
import queryClient from './queryClient';

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

import store from './store';
const app = createApp(App).use(store)

app.provide(ApolloClients, {
    default: apolloClient,
});

registerPlugins(app)

app.use(queryClient);
app.mount('#app')