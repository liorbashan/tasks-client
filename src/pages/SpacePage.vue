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
                    <v-btn fab absolute bottom right color="indigo" @click="openTaskForm()">
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
        <v-dialog overlay-color="#46529d" v-model="taskFormDialogOpen" @closed="taskFormDialogOpen = false" fullscreen transition="dialog-bottom-transition">
            <v-card light class="inherit-width task-form-card">
                <v-toolbar class="pt-2" color="transparent" flat>
                    <v-toolbar-title class="white--text task-form-title">Task</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <div class="circle" @click="taskFormDialogOpen = false">
                        <div class="before"></div>
                        <div class="after"></div>
                    </div>
                </v-toolbar>
            </v-card>
        </v-dialog>
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
            taskFormDialogOpen: false,
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
        openTaskForm() {
            this.taskFormDialogOpen = true;
        },
    },
};
</script>

<style lang="scss">
.v-image__image--cover {
    opacity: 0.75;
}
.inherit-width.task-form-card {
    background-color: #46529d !important;
    color: #fff;
}
.task-form-title{
    font-size: 40px !important;
    align-self: baseline !important;
}
.circle {
    width: 42px;
    height: 42px;
    position: relative;
    border-radius: 50%;
    border: 1px solid #fff;
    cursor: pointer;
    z-index: 2;
    padding-bottom: 1px;
}
.before,
.after {
    content: '';
    position: absolute;
    width: 28px;
    height: 2px;
    background-color: white;
    border-radius: 0;
    top: 20px;
    -webkit-transition: 150ms ease-out;
    -moz-transition: 150ms ease-out;
    -o-transition: 150ms ease-out;
    transition: 150ms ease-out;
    z-index: 0;
}
.before {
    left: 7px;
    -ms-transform: rotate(225deg);
    -webkit-transform: rotate(225deg);
    -moz-transform: rotate(225deg);
    transform: rotate(225deg);
    -webkit-transition: 300ms ease-in-out all;
    -moz-transition: 300ms ease-in-out all;
    -o-transition: 300ms ease-in-out all;
    transition: 300ms ease-in-out all;
}
.after {
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    transform: rotate(-90deg);
    right: 7px;
    -ms-transform: rotate(-225deg);
    -webkit-transform: rotate(-225deg);
    -moz-transform: rotate(-225deg);
    transform: rotate(-225deg);
    -webkit-transition: 250ms ease-in all;
    -moz-transition: 250ms ease-in all;
    -o-transition: 250ms ease-in all;
    transition: 250ms ease-in all;
}
</style>