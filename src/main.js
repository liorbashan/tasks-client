import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import apollo from './apolloClient';
import vuetify from './plugins/vuetify';
import firebase from 'firebase';
import AppLayout from './layouts/AppLayout';
import PublicLayout from './layouts/PublicLayout';

// Import the plugin here
Vue.component('PublicLayout', PublicLayout);
Vue.component('AppLayout', AppLayout);

Vue.config.productionTip = false;
Vue.prototype.$apollo = apollo;
const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_apiKey,
    authDomain: process.env.VUE_APP_FIREBASE_authDomain,
    databaseURL: process.env.VUE_APP_FIREBASE_databaseURL,
    projectId: process.env.VUE_APP_FIREBASE_projectId,
    storageBucket: process.env.VUE_APP_FIREBASE_storageBucket,
    messagingSenderId: process.env.VUE_APP_FIREBASE_messagingSenderId,
    appId: process.env.VUE_APP_FIREBASE_appId,
};
firebase.initializeApp(firebaseConfig);
new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app');
