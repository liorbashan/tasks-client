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
                            <img referrerpolicy="no-referrer" :src="space.imageUrl" />
                        </v-avatar>
                    </router-link>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-content>
                        <v-list-item-title class="title">{{ applicationName }}</v-list-item-title>
                        <v-list-item-subtitle v-if="space">{{ space.title }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list v-if="!user" nav>
                <v-list-item-content>
                    <v-btn class="white--text" @click="login()" depressed color="transparent" tile>login</v-btn>
                </v-list-item-content>
            </v-list>
            <v-list v-if="user" nav>
                <v-list-item ripple link v-for="(item, i) in menuItems" :key="i">
                    <v-list-item-content>
                        <router-link class="white--text" :to="item.link">
                            <v-icon v-text="item.icon"></v-icon>
                            <v-btn class="white--text" depressed color="transparent" tile>{{ item.text }}</v-btn>
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
                        <img referrerpolicy="no-referrer" :src="space.imageUrl" />
                    </v-avatar>
                </router-link>
            </v-list-item-avatar>
            <v-spacer></v-spacer>
            <div class="pt-1">
                <v-toolbar-title v-if="!space">{{ applicationName }}</v-toolbar-title>
                <v-toolbar-title v-if="space">{{ space.title }}</v-toolbar-title>
            </div>
            <v-spacer></v-spacer>
            <div>
                <!-- show login when not authenticated -->
                <v-btn v-if="!authenticated" @click="login()" depressed text>
                    Login
                    <v-icon>mdi-login</v-icon>
                </v-btn>
                <!-- show logout when authenticated -->
                <div v-if="user">
                    <v-avatar width="32" height="32">
                        <img referrerpolicy="no-referrer" :src="user.picture" />
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
            authenticated: false,
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
            this.getUser();
        } else {
            this.authenticated = false;
        }
    },
    computed: {
        user() {
            return this.$store.getters['user/GET_USER'];
        },
        space() {
            return this.$store.getters['space/GET_SPACE'];
        },
    },
    methods: {
        async login() {
            EventBus.$emit('SHOW_LOADER', 1);
            await authService.signInWithGoogle().catch((error) => {
                console.log(error.message);
                EventBus.$emit('SHOW_ERROR', error.message);
            });
            const userToken = authService.getTokenFromLocalStorage();
            if (userToken) {
                this.getUser();
            }
            EventBus.$emit('HIDE_LOADER', 1);
        },
        logout() {
            authService.logout();
            this.$store.dispatch('user/REMOVE_USER');
            this.$store.dispatch('space/REMOVE_SPACE');
            this.authenticated = false;
            if (this.$router.currentRoute.name !== 'Home') {
                this.$router.push('/');
            }
        },
        async getUser() {
            let user = null;
            if (!this.user) {
                const userToken = authService.getTokenFromLocalStorage();
                if (!userToken) {
                    EventBus.$emit('SHOW_ERROR', 'User is not authenticated');
                    return;
                }
                const userData = authService.parseJwt(userToken);
                const fetchUserPayload = { email: userData.email };
                user = await this.$store.dispatch('user/FETCH_USER', fetchUserPayload).catch((error) => {
                    console.log(error.message);
                    EventBus.$emit('SHOW_ERROR', error.message);
                });
            } else {
                user = this.user;
            }
            this.authenticated = true;
            if (!this.space) {
                if (user.spaceId) {
                    const getSpacePayload = { id: user.spaceId };
                    await this.$store.dispatch('space/FETCH_SPACE', getSpacePayload);
                }
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