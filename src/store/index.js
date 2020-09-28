import Vue from 'vue';
import Vuex from 'vuex';
import space from './modules/space';
import categories from './modules/category';
import user from './modules/user';
import tasks from './modules/task';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        categories,
        user,
        space,
        tasks,
    },
});
