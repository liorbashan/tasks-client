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
        REMOVE_USER: (state) => {
            state.user = null;
        },
    },
    getters: {
        GET_USER: (state) => {
            return state.user;
        },
    },
    actions: {
        SET_USER: ({ commit }, userData) => {
            commit('SET_USER', userData);
        },
        REMOVE_USER: async ({ commit }) => {
            EventBus.$emit('SHOW_LOADER', 1);
            commit('REMOVE_USER');
            EventBus.$emit('HIDE_LOADER', 1);
        },
    },
};
