<template>
    <v-container justify="center" class="white pa-2" fluid>
        <v-row class="header-wrapper justify-center ma-auto">
            <v-col align="left" col="2">
                <h1 class="black--text">Homepage</h1>
            </v-col>
            <v-col align="right" col="2"></v-col>
        </v-row>
        <v-divider light></v-divider>
        <v-row class="justify-center"></v-row>
    </v-container>
</template>

<script>
import ConfirmBox from '../components/ConfirmBox';
import { EventBus } from '../eventBus';
import { mapGetters } from 'vuex';
export default {
    name: 'Homepage',
    components: {},
    data() {
        return {
            applicationName: process.env.VUE_APP_APPLICATION_NAME || '',
            spaceId: null,
        };
    },
    created() {},
    methods: {},
};
</script>

<style lang="scss" scoped>
.header-wrapper {
    max-width: 1050px;
    // border-bottom: 1px solid #e1e1e1;
}
</style>