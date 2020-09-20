import Vue from 'vue';
import Vuex from 'vuex';
// import tasks from './modules/tasks';
import space from './modules/space';
// import projects from './modules/projects';
// import epics from './modules/epics';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        space,
    },
});
