import Vue from 'vue';
import Router from 'vue-router';
import Homepage from '../pages/Homepage';
import Tasks from '../pages/Tasks';
import ShoppingList from '../pages/ShoppingList';
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            components: {
                default: Homepage,
            },
        },
        {
            path: '/tasks',
            name: 'Tasks',
            component: Tasks,
        },
        {
            path: '/shoppingList',
            name: 'ShoppingList',
            component: ShoppingList,
            props: true,
        },
    ],
});
