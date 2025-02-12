import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import store from "./store";

// HTTP connection to the API
const httpLink = createHttpLink({
    uri: store.state.noAuthBackendUrl,
})

const authLink = setContext((_, { headers }) => {
// get the authentication token from local storage if it exists
const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
        }
    }
});

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
})

export default apolloClient;