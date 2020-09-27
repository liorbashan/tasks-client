<template>
    <v-list-item>
        <v-list-item-avatar>
            <v-icon>{{ categoryIcon }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title v-text="task.title"></v-list-item-title>
            <v-list-item-subtitle v-text="task.description"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
            <v-list-item-avatar width="32">
                <v-img referrerpolicy="no-referrer" alt="user" :src="task.User.picture"></v-img>
            </v-list-item-avatar>
            <div>{{task.dueDate}}</div>
        </v-list-item-action>
    </v-list-item>
</template>
<script>
import { EventBus } from '../eventBus';
export default {
    name: 'Task',
    components: {},
    props: {
        task: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            icons: [],
        };
    },
    created() {
        this.icons = this.$store.getters['categories/GET_CATEGORIES'];
    },
    computed: {
        categoryIcon() {
            const icon =  this.icons.filter((x) => {
                return x.name === this.task.category;
            });
            const result = icon[0].icon;
            console.log(result);
            return result;
        },
    },
    filters: {
        dateFormat(date) {
            let d = new Date(date);
            let datestring =
                ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.' + d.getFullYear() + ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
            return datestring;
        },
    },
    methods: {},
};
</script>
<style lang="scss">
</style>