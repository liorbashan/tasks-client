import { EventBus } from '@/eventBus';
import * as taskService from '../../services/taskService';

export default {
    namespaced: true,
    state: {
        task: null,
    },
    mutations: {
        SET_TASK: function(state, task) {
            state.task = task;
        },
    },
    actions: {},
    getters: {
        GET_TASK: (state) => {
            return state.task;
        },
    },
};
