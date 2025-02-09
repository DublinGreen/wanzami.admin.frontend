import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import store from "./store";

// HTTP connection to the API
const httpLink = createHttpLink({
    uri: store.state.noAuthBackendUrl,
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})

export default apolloClient;