<template>
    <v-list-item class="pa-0">
        <v-list-item-avatar>
            <v-icon>{{ categoryIcon }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content class="align-self-center">
            <v-list-item-title class="text-capitalize" v-text="task.title"></v-list-item-title>
            <v-list-item-subtitle v-text="task.description"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action class="align-self-stretch mb-2">
            <v-list-item-avatar size="32">
                <v-img referrerpolicy="no-referrer" alt="user" :src="task.User.picture"></v-img>
            </v-list-item-avatar>
            <div class="duedate grey--text font-italic">{{ task.dueDate | dateFormat(task.dueDate) }}</div>
        </v-list-item-action>
        <v-list-item-icon class="task-menu align-self-start ma-0">
            <v-btn x-small icon>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </v-list-item-icon>
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
            const icon = this.icons.filter((x) => {
                return x.name === this.task.category;
            });
            const result = icon[0].icon;
            return result;
        },
    },
    filters: {
        dateFormat(date) {
            return new Date(Number(date)).toLocaleDateString();
        },
    },
    methods: {},
};
</script>
<style lang="scss">
.v-list--three-line .v-list-item .v-list-item__avatar:not(.v-list-item__avatar--horizontal),
.v-list--three-line .v-list-item .v-list-item__icon,
.v-list--two-line .v-list-item .v-list-item__avatar:not(.v-list-item__avatar--horizontal),
.v-list--two-line .v-list-item .v-list-item__icon,
.v-list-item--three-line .v-list-item__avatar:not(.v-list-item__avatar--horizontal),
.v-list-item--three-line .v-list-item__icon,
.v-list-item--two-line .v-list-item__avatar:not(.v-list-item__avatar--horizontal),
.v-list-item--two-line .v-list-item__icon {
    margin: auto !important;
}
.duedate {
    font-size: 11px;
}
.task-menu.align-self-start.ma-0 {
    margin-top: 0px !important;
}
</style>