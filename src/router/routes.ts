import { RouteConfig } from 'vue-router';
import Login from '../pages/Login.vue';
import MainLayout from 'layouts/MainLayout.vue';
import Index from '../pages/index.vue';
import Error404 from '../pages/Error404.vue';

const routes: RouteConfig[] = [
    {
        path: '/',
        component: MainLayout,
        children: [{ path: '', component: Index }],
    },
    {
        path: '/login',
        component: MainLayout,
        children: [{ path: '', component: Login }],
    },
    // Always leave this as last one,
    // but you can also remove it
    {
        path: '*',
        component: Error404,
    },
];

export default routes;
