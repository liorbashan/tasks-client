import Vue from 'vue';
import Router from 'vue-router';
import Homepage from '../pages/Homepage';
import Login from '../pages/Login';
import Epicpage from '../pages/Epicpage';
import Projectpage from '../pages/Projectpage';
import Userpage from '../pages/Userpage';

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
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/users',
            name: 'Userpage',
            component: Userpage,
        },
        {
            path: '/project/:id/:name',
            name: 'Projectpage',
            component: Projectpage,
            props: true,
        },
        {
            path: '/epic/:id/:name',
            name: 'Epicpage',
            component: Epicpage,
            props: true,
        },
    ],
});
