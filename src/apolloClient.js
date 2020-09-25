import ApolloClient from 'apollo-boost';
import * as authService from './services/authService';

let userToken = authService.getTokenFromLocalStorage() ? authService.getTokenFromLocalStorage() : 'token';
userToken = userToken.slice(1, -1);

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
    headers: {
        authorization: `Bearer ${userToken}`,
    },
    defaultOptions,
    cache: null,
});
