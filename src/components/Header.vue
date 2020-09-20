<template>
    <div>
        <v-navigation-drawer v-model="drawer" temporary dark app clipped>
            <v-list>
                <v-list-item>
                    <v-list-item-avatar>
                        <v-img src="../assets/logo-white.png"></v-img>
                    </v-list-item-avatar>
                </v-list-item>

                <v-list-item link>
                    <v-list-item-content>
                        <v-list-item-title class="title">{{applicationName}}</v-list-item-title>
                        <v-list-item-subtitle></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list nav>
                <v-list-item ripple link v-for="(item, i) in menuItems" :key="i">
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <router-link class="white--text" :to="item.link">
                            <v-btn
                                class="white--text"
                                depressed
                                color="transparent"
                                tile
                            >{{item.text}}</v-btn>
                        </router-link>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar dense app clipped-left>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <router-link class="white--text" to="/">
                <v-btn depressed fab text>
                    <v-icon>home</v-icon>
                </v-btn>
            </router-link>
            <v-toolbar-title>{{applicationName}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <div>
                <!-- show login when not authenticated -->
                <v-btn v-if="!user" depressed text>
                    <router-link class="white--text pt-1" to="/login">Login</router-link>
                    <v-icon>login</v-icon>
                </v-btn>
                <!-- show logout when authenticated -->
                <div v-if="user">
                    <v-btn depressed fab text>
                        <img class="userIcon" :src="user.picture" />
                    </v-btn>
                    <v-btn depressed text small @click="logout()">Logout</v-btn>
                </div>
            </div>
        </v-app-bar>
    </div>
</template>

<script>
import * as authService from '../services/authService';
import { EventBus } from '@/eventBus';
export default {
    name: 'Header',
    data() {
        return {
            tokenName: process.env.VUE_APP_TOKEN_NAME,
            drawer: false,
            applicationName: process.env.VUE_APP_APPLICATION_NAME || '',
            menuItems: [
                { text: 'Home', icon: 'home', link: '/' },
                { text: 'Tags', icon: 'local_offer', link: '/tags' },
                { text: 'Users', icon: 'group', link: '/users' },
            ],
        };
    },
    created() {
        const userToken = authService.getTokenFromLocalStorage();
        if (userToken) {
            const userData = authService.parseJwt(userToken);
            if (authService.isTokenExpired(userData.exp)) {
                console.log('token expired!');
                this.$router.push('/login');
            } else {
                this.$store.dispatch('user/SET_USER', userData);
            }
        } else {
            this.$router.push('/login');
        }
    },
    computed: {
        user() {
            const user = this.$store.getters['user/GET_USER'];
            return user;
        },
    },
    methods: {
        logout() {
            authService.logout();
            this.$store.dispatch('user/REMOVE_USER');
            this.$router.push('/login');
        },
    },
};
</script>

<style lang="scss" scoped>
$iconSize: 32px;
a {
    color: #fff;
}
.userIcon {
    max-width: 100%;
    width: $iconSize;
    height: $iconSize;
    border-radius: $iconSize;
}
</style>