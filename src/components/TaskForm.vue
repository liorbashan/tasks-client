<template>
    <v-container class="pa-5">
        <v-form dark class="task-form mt-6" color="white" ref="taskForm" v-model="valid" lazy-validation>
            <v-text-field dark color="white" v-model="taskTitle" :rules="requiredRule" label="Title" ref="firstInput" required></v-text-field>
            <v-textarea dark light color="white" v-model="taskDescription" label="Description" outlined clearable auto-grow></v-textarea>
            <v-select dark light color="white" v-model="taskCategory" :items="categoryList" item-text="name" item-value="name" label="Category" :rules="requiredRule"></v-select>
            <v-select dark light color="white" v-model="taskUser" :items="spaceMembers" item-text="firstName" item-value="id" label="Assigned" :rules="requiredRule"></v-select>
            <!-- duedate -->
        </v-form>
        <!-- <v-row>
            <v-col class="pa-0">
                <v-card>
                    <v-card-title>
                        <h2>{{ formTitle }}</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="taskForm" @keydown.native.esc="close()" v-model="valid" lazy-validation>
                            <v-text-field v-model="taskTitle" :rules="requiredRule" label="Name" ref="firstInput" required></v-text-field>
                            <v-textarea v-model="taskDesc" :rules="requiredRule" label="Description" required outlined clearable auto-grow></v-textarea>
                            <v-select v-model="tagId" :items="tags" item-text="title" item-value="id" label="Tag" :rules="requiredRule"></v-select>
                            <v-select v-model="userId" :items="users" item-text="firstName" item-value="id" label="Assigned" :rules="requiredRule" @keydown.enter.native="createNewTask"></v-select>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error" depressed @click="close()">Close</v-btn>
                        <v-btn :disabled="!valid" color="success" depressed @click="createNewTask()">Submit</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row> -->
    </v-container>
</template>

<script>
import { EventBus } from '@/eventBus';
export default {
    name: 'TaskForm',
    props: ['task'],
    data() {
        return {
            categoryList: [],
            space: null,
            spaceMembers: [],
            taskTitle: null,
            taskCategory: null,
            taskUser: null,
            taskDescription: null,
            valid: false,
            requiredRule: [(v) => !!v || 'Required'],
            isEditMode: false,
        };
    },
    created() {
        if (this.task) {
            this.isEditMode = true;
            this.taskTitle = this.task.title;
            this.taskDescription = this.task.description;
            this.taskCategory = this.task.category;
            this.taskUser = this.task.User.id;
        }
        this.space = this.$store.getters['space/GET_SPACE'];
        this.categoryList = this.$store.getters['categories/GET_CATEGORIES'];
        this.spaceMembers = this.space.Users;
    },
    mounted() {
        setTimeout(() => {
            this.$refs.firstInput.focus();
        }, 0);
    },
    computed: {},
    methods: {
        async createNewTask() {
            // if (this.$refs.taskForm.validate()) {
            //     const payload = {
            //         taskTitle: this.taskTitle,
            //         taskDesc: this.taskDesc,
            //         tagId: this.tagId,
            //         epicId: this.epicId,
            //         userId: this.userId,
            //     };
            //     if (!this.isEditMode) {
            //         const task = await this.$store.dispatch('tasks/ADD_NEW_TASK', payload).catch((error) => {
            //             EventBus.$emit('SHOW_ERROR', error);
            //         });
            //         if (task) {
            //             EventBus.$emit('SHOW_SUCCESS', 'New Task Added');
            //         }
            //     } else {
            //         payload.taskId = this.task.id;
            //         const updateResult = await this.$store.dispatch('tasks/UPDATE_TASK_DETAILS', payload).catch((error) => {
            //             EventBus.$emit('SHOW_ERROR', error);
            //         });
            //         if (updateResult) {
            //             EventBus.$emit('SHOW_SUCCESS', `Task Updated!`);
            //         }
            //     }
            //     this.close();
            // }
        },
    },
};
</script>

<style lang="scss">
.task-form {
    input, textarea,select {
        color: #fff !important;
    }
}
</style>