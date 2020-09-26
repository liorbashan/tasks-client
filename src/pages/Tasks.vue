<template>
    <v-container class="pa-0 white align-start" fill-height fluid>
        <v-row justify="space-around">
            <v-card>
                <v-img height="200px" src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg">
                    <v-app-bar flat color="rgba(0, 0, 0, 0)">
                        <router-link class="white--text" to="/">
                            <v-icon>mdi-home</v-icon>
                        </router-link>

                        <v-toolbar-title class="title white--text pl-0"> Messages </v-toolbar-title>

                        <v-spacer></v-spacer>

                        <v-btn color="white" icon>
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </v-app-bar>

                    <v-card-title class="white--text mt-8">
                        <v-avatar size="56">
                            <img alt="user" src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg" />
                        </v-avatar>
                        <p class="ml-3">John Doe</p>
                    </v-card-title>
                </v-img>

                <v-card-text>
                    <div class="font-weight-bold ml-8 mb-2">Today</div>
                </v-card-text>
            </v-card>
        </v-row>
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
.wrapper {
    position: absolute;
    background: transparent;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
</style>