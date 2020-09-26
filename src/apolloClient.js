import ApolloClient from 'apollo-boost';
import * as authService from './services/authService';

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
    },
    query: {
        fetchPolicy: 'no-cache',
    },
};
export default new ApolloClient({
    uri: process.env.VUE_APP_GRAPHQL_URL,
    request: (operation) => {
        const token = authService.getTokenFromLocalStorage();
        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : '',
            },
        });
    },
    defaultOptions,
    cache: null,
});
