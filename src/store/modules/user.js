import { EventBus } from '@/eventBus';
import * as userService from '../../services/userService';

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
        UPDATE_USER: async ({ commit }, updateInput) => {
            let user = null;
            EventBus.$emit('SHOW_LOADER', 1);
            const result = await userService.updateUser(updateInput).catch((error) => {
                EventBus.$emit('SHOW_ERROR', error.message);
            });
            if (result) {
                commit('SET_USER', result);
            }
            EventBus.$emit('HIDE_LOADER', 1);
            return user;
        },
    },
};
