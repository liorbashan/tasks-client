import ApolloClient from 'apollo-boost';
import * as authService from './services/authService';

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
    cache: null,
});
