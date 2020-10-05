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
                        <v-menu light bottom left>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="white" v-bind="attrs" v-on="on" icon>
                                    <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                            </template>
                            <v-list dense>
                                <v-list-item v-if="!showHistory">
                                    <v-list-item-icon class="mr-1">
                                        <v-icon small>mdi-history</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content @click="toggleHistoryFilter(true)" class="task-menu-option">History</v-list-item-content>
                                </v-list-item>
                                <v-list-item v-if="showHistory">
                                    <v-list-item-icon class="mr-1">
                                        <v-icon small>mdi-format-list-checkbox</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content @click="toggleHistoryFilter(false)" class="task-menu-option">Show Pending Tasks</v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-app-bar>
                    <v-card-title class="white--text">{{ space.title }}</v-card-title>
                </v-img>
                <v-card-text class="white">
                    <h2 class="text-left text-body-1 black--text">{{ cardTitle }}</h2>
                    <div>
                        <v-btn @click="toggleFilterLine()" dark color="black" icon>
                            <v-icon>mdi-filter-variant</v-icon>
                        </v-btn>
                        <div v-if="showFilterLine" class="filters pt-2 pb-2 d-flex flex-row justify-space-between align-baseline">
                            <v-checkbox class="filterItem" light @change="toggleAssignedToMe($event)" label="Assigned to me"></v-checkbox>
                            <v-select class="filterItem" dense outlined light @change="toggleCategoty($event)" :items="categoryList" item-text="name" item-value="name" label="Category"></v-select>
                        </div>
                    </div>
                    <div v-if="tasks.length > 0">
                        <v-list v-for="(item, index) in tasks" :key="index" light three-line>
                            <Task :task="item" @details="openSummaryDialog" @edit="openTaskForm" />
                            <v-divider></v-divider>
                        </v-list>
                    </div>
                </v-card-text>
            </v-card>
        </div>
        <v-btn v-if="space" fab absolute bottom right color="indigo" class="add-button-fixed" @click="openTaskForm(null)">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-dialog overlay-color="#46529d" v-model="taskFormDialogOpen" @closed="closeTaskForm()" fullscreen transition="dialog-bottom-transition">
            <v-card light class="inherit-width task-form-card">
                <v-toolbar class="pt-2" color="transparent" flat>
                    <v-toolbar-title class="white--text task-form-title">Task</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <div class="circle" @click="closeTaskForm()">
                        <div class="before"></div>
                        <div class="after"></div>
                    </div>
                </v-toolbar>
                <TaskForm v-if="taskFormDialogOpen" :task="taskForForm" @close="closeTaskForm()" />
            </v-card>
        </v-dialog>
        <v-dialog overlay-color="black" class="summaryDialog" v-model="showTaskSummary" max-width="290">
            <v-container class="detailsContainer pa-0">
                <TaskSummary v-if="taskForSummary" :task="taskForSummary" @close="closeSummaryDialog()" />
            </v-container>
        </v-dialog>
    </v-container>
</template>

<script>
import { EventBus } from '../eventBus';
import * as authService from '../services/authService';
import Task from '../components/Task';
import TaskForm from '../components/TaskForm';
import TaskSummary from '../components/TaskSummary';
export default {
    name: 'SpacePage',
    components: { Task, TaskForm, TaskSummary },
    props: ['id'],
    data() {
        return {
            drawer: false,
            taskForForm: null,
            taskForSummary: null,
            spaceMembers: [],
            taskFormDialogOpen: false,
            showHistory: false,
            showFilterLine: false,
            categoryList: [],
            filterUser: false,
            filterCategory: 'All',
            showTaskSummary: false,
        };
    },
    async created() {
        this.categoryList = this.$store.getters['categories/GET_CATEGORIES'];
        this.categoryList.unshift({ icon: '', name: 'All' });
        let user = this.$store.getters['user/GET_USER'];
        if (!user) {
            user = await this.getUser();
        }
        let space = this.$store.getters['space/GET_SPACE'];
        if (!space) {
            space = await this.getSpace();
            if (!space) {
                this.$router.push('/');
                return;
            }
        }
        let tasks = this.$store.getters['tasks/GET_ALL_TASKS'];
        if (!tasks || tasks.length === 0) {
            await this.getTasks();
        }
        this.spaceMembers = this.space.Users;
    },
    computed: {
        space() {
            return this.$store.getters['space/GET_SPACE'];
        },
        user() {
            return this.$store.getters['user/GET_USER'];
        },
        tasks() {
            return this.$store.getters['tasks/GET_ALL_TASKS'];
        },
        cardTitle() {
            return this.showHistory ? 'Completed Tasks' : 'All Tasks';
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
        async getTasks() {
            if (this.user.spaceId) {
                const payload = { spaceId: this.user.spaceId, completed: false };
                if (this.filterCategory !== 'All') {
                    payload.category = this.filterCategory;
                }
                if (this.filterUser) {
                    payload.userId = this.user.id;
                }
                if (this.showHistory) {
                    payload.completed = true;
                }
                await this.$store.dispatch('tasks/FETCH_ALL_TASKS', payload).catch((error) => {
                    console.log(error.message);
                    EventBus.$emit('SHOW_ERROR', error.message);
                });
            }
        },
        async toggleFilterLine() {
            this.showFilterLine = !this.showFilterLine;
            if (!this.showFilterLine) {
                this.filterUser = false;
                this.filterCategory = 'All';
                this.showHistory = false;
                this.getTasks();
            }
        },
        async toggleHistoryFilter(showHistory) {
            this.showHistory = showHistory;
            this.getTasks();
        },
        async toggleAssignedToMe(e) {
            this.filterUser = e;
            this.getTasks();
        },
        async toggleCategoty(e) {
            this.filterCategory = e;
            this.getTasks();
        },
        openTaskForm(taskObj) {
            this.taskForForm = taskObj;
            this.taskFormDialogOpen = true;
        },
        closeTaskForm() {
            this.taskFormDialogOpen = false;
        },
        openSummaryDialog(taskObj) {
            this.taskForSummary = taskObj;
            this.showTaskSummary = true;
        },
        closeSummaryDialog() {
            this.showTaskSummary = false;
            this.taskForSummary = null;
        },
    },
};
</script>

<style lang="scss">
.v-image__image--cover {
    opacity: 0.75;
}
.inherit-width.task-form-card {
    background-color: #46529d !important; // #46529d !important;
    color: #fff;
}
.task-form-title {
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
    width: 27px;
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
.add-button-fixed {
    position: fixed !important;
    bottom: 15px !important;
}
.filterItem {
    max-width: 45% !important;
}
.summaryDialog {
    box-shadow: none !important;
}
.detailsContainer{
    border: 2px solid indigo;
}
</style>