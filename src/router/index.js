import Vue from 'vue';
import Router from 'vue-router';
import Homepage from '../pages/Homepage';
import SpacePage from '../pages/SpacePage';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            meta: { layout: 'public' },
            component: Homepage,
        },
        {
            path: '/space/:id',
            name: 'Space',
            meta: { layout: 'app' },
            component: SpacePage,
            props: true,
        },
    ],
});
