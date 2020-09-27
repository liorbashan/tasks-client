<template>
    <v-container class="pa-0 white align-start" fill-height fluid>
        <div class="inherit-width">
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
            <v-card class="inherit-width" style="width: inherit" flat>
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
                <v-card-text class="white">
                    <v-btn fab absolute bottom right color="indigo">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <h2 class="text-left text-body-1 black--text">All Tasks</h2>
                    <div v-if="tasks.length > 0">
                        <v-list v-for="(item, index) in tasks" :key="index" light three-line>
                            <Task :task="item" />
                            <v-divider></v-divider>
                        </v-list>
                    </div>
                </v-card-text>
            </v-card>
        </div>
    </v-container>
</template>

<script>
import { EventBus } from '../eventBus';
import * as authService from '../services/authService';
import Task from '../components/Task';
export default {
    name: 'SpacePage',
    components: { Task },
    props: ['id'],
    data() {
        return {
            drawer: false,
            tasks: [],
            spaceMembers: [],
        };
    },
    async created() {
        let user = this.$store.getters['user/GET_USER'];
        if (!user) {
            user = await this.getUser();
            let space = this.$store.getters['space/GET_SPACE'];
            if (!space) {
                space = await this.getSpace();
                if (!space) {
                    this.$router.push('/');
                    return;
                }
            }
        }
        this.tasks = this.space.Tasks;
        this.spaceMembers = this.space.Users;
    },
    computed: {
        space() {
            return this.$store.getters['space/GET_SPACE'];
        },
        user() {
            return this.$store.getters['user/GET_USER'];
        },
    },
    methods: {
        async getUser() {
            let user = null;
            const userToken = authService.getTokenFromLocalStorage();
            if (!userToken) {
                EventBus.$emit('SHOW_ERROR', 'User is not authenticated');
                this.$router.push('/');
                return;
            }
            const userData = authService.parseJwt(userToken);
            const fetchUserPayload = { email: userData.email };
            user = await this.$store.dispatch('user/FETCH_USER', fetchUserPayload).catch((error) => {
                console.log(error.message);
                EventBus.$emit('SHOW_ERROR', error.message);
            });
            return user;
        },
        async getSpace() {
            let space = null;
            if (this.user.spaceId) {
                const payload = { id: this.user.spaceId };
                space = await this.$store.dispatch('space/FETCH_SPACE', payload).catch((error) => {
                    console.log(error.message);
                    EventBus.$emit('SHOW_ERROR', error.message);
                });
            } else {
                EventBus.$emit('SHOW_ERROR', 'User is not associated with a space');
            }
            return space;
        },
    },
};
</script>

<style lang="scss">
.v-image__image--cover {
    opacity: 0.75;
}
</style>