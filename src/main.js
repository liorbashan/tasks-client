import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import apollo from './apolloClient';
import vuetify from './plugins/vuetify';
import firebase from 'firebase';

// Import the plugin here

// Install the authentication plugin here
// Vue.use(Auth0Plugin, {
//     domain: authDomain,
//     clientId: authClientId,
//     onRedirectCallback: (appState) => {
//         router.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
//     },
// });

Vue.config.productionTip = false;
Vue.prototype.$apollo = apollo;
const firebaseConfig = {
    VUE_APP_FIREBASE_apiKey: process.env.apiKey,
    VUE_APP_FIREBASE_authDomain: process.env.authDomain,
    VUE_APP_FIREBASE_databaseURL: process.env.databaseURL,
    VUE_APP_FIREBASE_projectId: process.env.projectId,
    VUE_APP_FIREBASE_storageBucket: process.env.storageBucket,
    VUE_APP_FIREBASE_messagingSenderId: process.env.messagingSenderId,
    VUE_APP_FIREBASE_appId: process.env.appId,
};
firebase.initializeApp(firebaseConfig);
new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app');
