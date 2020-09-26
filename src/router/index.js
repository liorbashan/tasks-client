import Vue from 'vue';
import Router from 'vue-router';
import Homepage from '../pages/Homepage';
import Tasks from '../pages/Tasks';
import ShoppingList from '../pages/ShoppingList';

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
            path: '/tasks',
            name: 'Tasks',
            meta: { layout: 'app' },
            component: Tasks,
        },
        {
            path: '/shoppingList',
            name: 'ShoppingList',
            meta: { layout: 'app' },
            component: ShoppingList,
            props: true,
        },
    ],
});
