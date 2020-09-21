<template>
    <div>
        <v-navigation-drawer v-model="drawer" temporary dark app clipped>
            <v-list>
                <v-list-item pl-0>
                    <router-link class="white--text" to="/">
                        <v-btn v-if="!space" depressed fab text small>
                            <v-icon>mdi-home</v-icon>
                        </v-btn>
                        <v-avatar width="64" height="64" v-if="space">
                            <img :src="space.imageUrl" />
                        </v-avatar>
                    </router-link>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-content>
                        <v-list-item-title class="title">{{applicationName}}</v-list-item-title>
                        <v-list-item-subtitle v-if="space">{{space.title}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list v-if="!user" nav>
                <v-list-item-content>
                    <router-link class="white--text" to="/login">
                        <v-icon>mdi-login</v-icon>
                        <v-btn class="white--text" depressed color="transparent" tile>login</v-btn>
                    </router-link>
                </v-list-item-content>
            </v-list>
            <v-list v-if="user" nav>
                <v-list-item ripple link v-for="(item, i) in menuItems" :key="i">
                    <v-list-item-content>
                        <router-link class="white--text" :to="item.link">
                            <v-icon v-text="item.icon"></v-icon>
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
            <v-list-item-avatar>
                <router-link class="white--text" to="/">
                    <v-btn v-if="!space" depressed fab text small>
                        <v-icon>mdi-home</v-icon>
                    </v-btn>
                    <v-avatar width="32" height="32" v-if="space">
                        <img :src="space.imageUrl" />
                    </v-avatar>
                </router-link>
            </v-list-item-avatar>
            <v-spacer></v-spacer>
            <div class="pt-1">
                <v-toolbar-title v-if="!space">{{applicationName}}</v-toolbar-title>
                <v-toolbar-title v-if="space">{{space.title}}</v-toolbar-title>
            </div>
            <v-spacer></v-spacer>
            <div>
                <!-- show login when not authenticated -->
                <v-btn v-if="!user" depressed text>
                    <router-link class="white--text pt-1" to="/login">Login</router-link>
                    <v-icon>mdi-login</v-icon>
                </v-btn>
                <!-- show logout when authenticated -->
                <div v-if="user">
                    <v-avatar width="32" height="32">
                        <img :src="user.picture" />
                    </v-avatar>
                    <v-btn depressed x-small @click="logout()">
                        <v-icon>mdi-logout</v-icon>
                    </v-btn>
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
                { text: 'Home', icon: 'mdi-home-outline', link: '/' },
                { text: 'Shopping List', icon: 'mdi-cart-outline', link: '/shoppingList' },
                { text: 'Tasks', icon: 'mdi-clipboard-list-outline', link: '/tasks' },
            ],
        };
    },
    async created() {
        const userToken = authService.getTokenFromLocalStorage();
        if (userToken) {
            const userData = authService.parseJwt(userToken);
            if (authService.isTokenExpired(userData.exp)) {
                console.log('token expired!');
                if (this.$router.currentRoute.name !== 'Login') {
                    this.$router.push('/login');
                }
            } else {
                this.$store.dispatch('user/SET_USER', userData);
                await this.$store.dispatch('space/GET_SPACE_BY_ID', userData.spaceId);
            }
        } else {
            if (this.$router.currentRoute.name !== 'Login') {
                this.$router.push('/login');
            }
        }
    },
    computed: {
        user() {
            const user = this.$store.getters['user/GET_USER'];
            return user;
        },
        space() {
            return this.$store.getters['space/GET_SPACE'];
        },
    },
    methods: {
        logout() {
            authService.logout();
            this.$store.dispatch('user/REMOVE_USER');
            this.$store.dispatch('space/REMOVE_SPACE');
            if (this.$router.currentRoute.name !== 'Login') {
                this.$router.push('/login');
            }
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
.space-icon {
    max-width: 100%;
    width: $iconSize;
    height: $iconSize;
    border-radius: $iconSize;
}
</style>