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
        GET_SPACE_BY_ID: async ({ commit }, spaceId) => {
            let space = null;
            EventBus.$emit('SHOW_LOADER', 1);
            const result = await spaceService.getSpaceById(spaceId).catch((error) => {
                EventBus.$emit('SHOW_ERROR', error.message);
            });
            if (result) {
                space = result.data.GetSpace;
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
        GET_USER_SPACE: (state) => {
            return state.space;
        },
    },
};
