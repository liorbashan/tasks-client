import { EventBus } from '@/eventBus';
import * as taskService from '../../services/taskService';
// const _ = require('lodash');

export default {
    namespaced: true,
    state: {
        tasks: [],
    },
    mutations: {
        SET_TASKS: function(state, tasks) {
            state.tasks = tasks;
        },
        ADD_TASK: function(state, newTask) {
            state.tasks = [...state.tasks, newTask];
        },
        UPDATE_TASK: function(state, updatedTask) {
            let task = state.tasks.find((x) => {
                return x.id === updatedTask.id;
            });
            Object.assign(task, updatedTask);
        },
        REMOVE_TASK: function(state, payload) {
            const i = state.tasks.map((item) => item.id).indexOf(payload);
            state.tasks.splice(i, 1);
        },
    },
    actions: {
        FETCH_ALL_TASKS: async ({ commit }, payload) => {
            let tasks = [];
            EventBus.$emit('SHOW_LOADER', 1);
            const result = await taskService.getAll(payload).catch((error) => {
                EventBus.$emit('SHOW_ERROR', error.message);
            });
            if (result) {
                tasks = result;
            }
            commit('SET_TASKS', tasks);
            EventBus.$emit('HIDE_LOADER', 1);
            return tasks;
        },
        ADD_TASK: async ({ commit }, payload) => {
            let task = null;
            EventBus.$emit('SHOW_LOADER', 1);
            const result = await taskService.addTask(payload).catch((error) => {
                EventBus.$emit('SHOW_ERROR', error.message);
            });
            if (result) {
                task = result;
            }
            commit('ADD_TASK', task);
            EventBus.$emit('HIDE_LOADER', 1);
            return task;
        },
        UPDATE_TASK: async ({ commit }, payload) => {
            let task = null;
            EventBus.$emit('SHOW_LOADER', 1);
            const result = await taskService.updateTask(payload).catch((error) => {
                EventBus.$emit('SHOW_ERROR', error.message);
            });
            if (result) {
                task = result;
            }
            commit('UPDATE_TASK', task);
            EventBus.$emit('HIDE_LOADER', 1);
            return task;
        },
        DELETE_TASK: async ({ commit }, payload) => {
            let deletedArr = [];
            EventBus.$emit('SHOW_LOADER', 1);
            const result = await taskService.deleteTask(payload).catch((error) => {
                EventBus.$emit('SHOW_ERROR', error.message);
            });
            if (result && result.affected === 1) {
                commit('REMOVE_TASK', payload);
            }
            EventBus.$emit('HIDE_LOADER', 1);
            return result;
        },
    },
    getters: {
        GET_ALL_TASKS: (state) => {
            return state.tasks;
        },
        GET_TASK_BY_ID: (state) => (id) => {
            return state.tasks.find((item) => {
                return item.id === id;
            });
        },
    },
};
