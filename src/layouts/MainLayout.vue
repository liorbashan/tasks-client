<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn
                    flat
                    dense
                    round
                    icon="menu"
                    aria-label="Menu"
                    @click="leftDrawerOpen = !leftDrawerOpen"
                />

                <q-toolbar-title>Quasar App</q-toolbar-title>

                <div>
                    <q-avatar>
                        <img v-if="userData" referrerpolicy="no-referrer" :src="userData.picture" />
                    </q-avatar>
                </div>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
            <q-list>
                <q-item-label header class="text-grey-8">Essential Links</q-item-label>
                <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue';
import * as FirebaseService from '../services/firebase';
import { userInfo } from 'os';
export default {
    name: 'MainLayout',
    components: {
        EssentialLink,
    },
    data() {
        return {
            tokenName: process.env.TOKEN_NAME,
            userData: null,
            leftDrawerOpen: false,
            essentialLinks: [
                {
                    title: 'Login',
                    caption: '',
                    icon: 'login',
                    link: 'login',
                },
            ],
        };
    },
    computed: {
        userToken() {
            return localStorage.getItem(this.tokenName) ? localStorage.getItem(this.tokenName) : null;
        },
    },
    created() {
        if (this.userToken) {
            this.userData = this.parseJwt(this.userToken);
            if (this.isTokenExpired(this.userData.exp)) {
                console.log('token expired');
                this.userData = null;
                this.logout();
                this.$router.push({ path: 'login' })
            }
        } else {
          this.userData = null;
          this.$router.push({ path: 'login' })
        }
    },
    methods: {
        parseJwt(token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(function (c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    })
                    .join('')
            );

            return JSON.parse(jsonPayload);
        },
        logout() {
            this.FirebaseService.logout();
        },
        isTokenExpired(timestamp) {
            if (Date.now() >= timestamp * 1000) {
                return true;
            }
            return false;
        },
    },
};
</script>
