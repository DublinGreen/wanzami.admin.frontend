import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

// Import Vue store if needed
import store from "./store";

// 🔹 Authentication GraphQL Client
const authHttpLink = createHttpLink({
    uri: store.state.noAuthBackendUrl
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    };
});

const authApolloClient = new ApolloClient({
    link: authLink.concat(authHttpLink),
    cache: new InMemoryCache(),
});

// 🔹 Data Service GraphQL Client
const dataHttpLink = createHttpLink({
    uri: store.state.noAuthBackendUrl
});

const dataApolloClient = new ApolloClient({
    link: dataHttpLink,
    cache: new InMemoryCache(),
});

// Export both clients
export { authApolloClient, dataApolloClient };
