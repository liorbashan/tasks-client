<template>
    <v-container justify="center" class="white pa-2" fluid>
        <v-row dense class="header-wrapper justify-center ma-auto">tasks</v-row>
        <v-divider light></v-divider>
        <v-row class="justify-center align-strech mt-3"></v-row>
    </v-container>
</template>

<script>
import draggable from 'vuedraggable';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import store from '../store';
export default {
    name: 'Tasks',
    props: ['spaceId'],
    components: {},
    data() {
        return {};
    },
    async created() {},
    computed: {},
    methods: {},
};
</script>

<style lang="scss" scoped>
</style>