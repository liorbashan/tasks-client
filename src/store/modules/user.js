// import apollo from '../../apolloClient';
// import userskGQL from '../../gql/users.gql';
import { EventBus } from '@/eventBus';
const _ = require('lodash');

export default {
    namespaced: true,
    state: {
        user: null,
    },
    mutations: {
        SET_USER: (state, user) => {
            state.user = user;
        },
    },
    getters: {
        GET_USER: (state) => {
            return state.user;
        },
    },
    actions: {
        FETCH_ALL_USERS: async ({ commit }) => {
            let data = [];
            EventBus.$emit('SHOW_LOADER', 1);
            // const result = await apollo
            //     .query({
            //         query: userskGQL.getAllUsers,
            //         fetchPolicy: 'no-cache',
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
            // if (result) {
            //     data = result.data.queryUser;
            //     commit('SET_USERS', data);
            // }
            EventBus.$emit('HIDE_LOADER', 1);
            return data;
        },
    },
};
