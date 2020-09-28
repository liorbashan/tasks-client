<template>
    <v-container class="pa-5">
        <v-form dark class="task-form mt-6" color="white" ref="taskForm" v-model="valid" lazy-validation>
            <v-text-field dark color="white" v-model="taskTitle" :rules="requiredRule" label="Title" ref="firstInput" required></v-text-field>
            <v-textarea dark color="white" v-model="taskDescription" label="Description" outlined clearable auto-grow></v-textarea>
            <v-select dark color="white" v-model="taskCategory" :items="categoryList" item-text="name" item-value="name" label="Category" :rules="requiredRule"></v-select>
            <v-select dark color="white" v-model="taskUser" :items="spaceMembers" item-text="firstName" item-value="id" label="Assigned" :rules="requiredRule"></v-select>
            <v-menu v-model="datepicker" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field dark v-model="taskDueDate" label="Due Date" prepend-icon="mdi-calendar" readonly :rules="requiredRule" v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="taskDueDate" @input="datepicker = false"></v-date-picker>
            </v-menu>
            <div class="actions text-right">
                <v-btn :disabled="!valid" color="teal white--text ma-2" depressed @click="submitTask()"> Submit<v-icon right color="white">mdi-send-outline</v-icon> </v-btn>
            </div>
        </v-form>
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
            taskDueDate: null,
            datepicker: false,
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
            this.taskDueDate = this.formatDate(this.task.dueDate);
        }
        this.space = this.$store.getters['space/GET_SPACE'];
        this.categoryList = this.$store.getters['categories/GET_CATEGORIES'];
        this.spaceMembers = this.space.Users;
    },
    mounted() {
        if (!this.isEditMode) {
            setTimeout(() => {
                this.$refs.firstInput.focus();
            }, 0);
        }
    },
    methods: {
        async submitTask() {
            if (this.$refs.taskForm.validate()) {
                EventBus.$emit('SHOW_LOADER', 1);
                const space = this.$store.getters['space/GET_SPACE'];
                let task = null;
                if (!this.isEditMode) {
                    // Create new Task:
                    const newTaskPayload = {
                        title: this.taskTitle,
                        description: this.taskDescription,
                        spaceId: space.id,
                        dueDate: this.taskDueDate,
                        userId: this.taskUser,
                        category: this.taskCategory,
                    };
                    task = await this.$store.dispatch('tasks/ADD_TASK', newTaskPayload).catch((error) => {
                        EventBus.$emit('SHOW_ERROR', error.message);
                    });
                } else {
                    // Update existing task:
                    const updateTaskInput = {
                        id: this.task.id,
                        title: this.taskTitle,
                        description: this.taskDescription,
                        dueDate: this.taskDueDate,
                        userId: this.taskUser,
                        category: this.taskCategory,
                    };
                    task = await this.$store.dispatch('tasks/UPDATE_TASK', updateTaskInput).catch((error) => {
                        EventBus.$emit('SHOW_ERROR', error.message);
                    });
                }
                EventBus.$emit('HIDE_LOADER', 1);
                if (task) {
                    EventBus.$emit('SHOW_SUCCESS', `Task ${this.isEditMode ? 'Updated' : 'Created'} Successfuly`);
                }
                this.$emit('close');
            }
        },
        formatDate(date) {
            if (!date) {
                return null;
            } else {
                date = new Date(Number(date)).toLocaleDateString();
                const [month, day, year] = date.split('/');
                return `${year}-${month}-${day}`;
            }
        },
    },
};
</script>

<style lang="scss">
.task-form {
    input,
    textarea,
    select {
        color: #fff !important;
    }
}
</style>