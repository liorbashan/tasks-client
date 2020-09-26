import { EventBus } from '@/eventBus';
import * as spaceService from '../../services/spaceService';

export default {
    namespaced: true,
    state: {
        space: null,
    },
    mutations: {
        SET_SPACE: function(state, space) {
            state.space = space;
        },
        REMOVE_SPACE: function(state) {
            state.space = null;
        },
    },
    actions: {
        FETCH_SPACE: async ({ commit }, getSpaceInput) => {
            let space = null;
            EventBus.$emit('SHOW_LOADER', 1);
            const result = await spaceService.getOne(getSpaceInput).catch((error) => {
                EventBus.$emit('SHOW_ERROR', error.message);
            });
            if (result) {
                space = result;
            }
            commit('SET_SPACE', space);
            EventBus.$emit('HIDE_LOADER', 1);
            return space;
        },
        UPDATE_SPACE: async ({ commit }, updateInput) => {
            let space = null;
            EventBus.$emit('SHOW_LOADER', 1);
            const result = await spaceService.updateSpace(updateInput).catch((error) => {
                EventBus.$emit('SHOW_ERROR', error.message);
            });
            if (result) {
                space = result;
            }
            commit('SET_SPACE', space);
            EventBus.$emit('HIDE_LOADER', 1);
            return space;
        },
        REMOVE_SPACE: ({ commit }) => {
            commit('REMOVE_SPACE');
        },
    },
    getters: {
        GET_SPACE: (state) => {
            return state.space;
        },
    },
};
