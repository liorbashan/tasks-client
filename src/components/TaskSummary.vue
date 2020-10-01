<template>
    <v-card class="detailsCard" light>
        <v-card-title class="headline"> {{ task.title }} </v-card-title>
        <v-card-text>{{ task.description }}</v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="indigo" text @click="close()"> Close </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'TaskSummary',
    props: ['task'],
    data() {
        return {};
    },
    methods: {
        close() {
            this.$emit('close');
        },
    },
};
</script>

<style lang="scss">

</style>