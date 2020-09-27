<template>
    <v-container class="pa-0 white align-start" fill-height fluid>
        <v-row justify="space-around">
            <v-navigation-drawer v-model="drawer" color="white" light temporary app>
                <v-list v-if="user">
                    <v-list-item class="px-2">
                        <v-list-item-avatar width="64" height="64">
                            <v-img referrerpolicy="no-referrer" alt="user" :src="user.picture"></v-img>
                        </v-list-item-avatar>
                    </v-list-item>

                    <v-list-item link>
                        <v-list-item-content>
                            <v-list-item-title class="title"> {{ user.firstName }} {{ user.lastName }} </v-list-item-title>
                            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-list nav dense>
                    <router-link to="/">
                        <v-list-item link>
                            <v-list-item-icon>
                                <v-icon>mdi-home</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Home</v-list-item-title>
                        </v-list-item>
                    </router-link>
                </v-list>
            </v-navigation-drawer>
            <v-card flat width="100%">
                <v-img v-if="space" height="150px" referrerpolicy="no-referrer" :src="space.imageUrl">
                    <v-app-bar dense prominent flat color="rgba(0, 0, 0, 0)">
                        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                        <v-spacer></v-spacer>
                        <v-btn color="white" icon>
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </v-app-bar>
                    <v-card-title class="white--text">{{ space.title }}</v-card-title>
                </v-img>

                <v-card-text class="white" color="white">
                    <div class="font-weight-bold black--text">Tasks List</div>
                    <v-list light>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon>mdi-folder</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>My Files</v-list-item-title>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon>mdi-account-multiple</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Shared with me</v-list-item-title>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon>mdi-star</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Starred</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-card-text>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
import * as authService from '../services/authService';
export default {
    name: 'SpacePage',
    props: ['id'],
    data() {
        return {
            drawer: false,
        };
    },
    created() {
        let space = this.$store.getters['space/GET_SPACE'];
        if (!space) {
            const payload = { id: this.id };
            this.$store.dispatch('space/FETCH_SPACE', payload);
        }
        let user = this.$store.getters['user/GET_USER'];
        if (!user) {
            const userToken = authService.getTokenFromLocalStorage();
            const userData = authService.parseJwt(userToken);
            const fetchUserPayload = { email: userData.email };
            user = this.$store.dispatch('user/FETCH_USER', fetchUserPayload).catch((error) => {
                console.log(error.message);
                EventBus.$emit('SHOW_ERROR', error.message);
            });
        }
    },
    computed: {
        space() {
            return this.$store.getters['space/GET_SPACE'];
        },
        user() {
            return this.$store.getters['user/GET_USER'];
        },
    },
};
</script>

<style lang="scss">
.v-image__image--cover {
    opacity: 0.75;
}
</style>