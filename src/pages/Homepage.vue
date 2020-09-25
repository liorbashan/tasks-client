<template>
    <v-container justify="center" class="white pa-2" fluid>
        <v-row class="header-wrapper justify-center ma-auto">
            <v-col align="left" col="2">
                <h4 class="black--text">Hi, {{user}}</h4>
            </v-col>
        </v-row>
        <v-divider light></v-divider>
        <v-row v-if="spaceId" class="justify-center align-content-space-around">
            <router-link to="/shoppingList">
                <v-icon class="box" size="200" color="light-blue darken-1">mdi-cart-outline</v-icon>
            </router-link>
            <router-link to="/tasks">
                <v-icon
                    class="box"
                    size="200"
                    color="deep-orange darken-1"
                >mdi-clipboard-list-outline</v-icon>
            </router-link>
        </v-row>
        <v-row v-else class="justify-center align-content-space-around">
            <v-col>
                <h3>You are not part of any space. Please join a space</h3>
            </v-col>
        </v-row>
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
    computed: {
        user() {
            const user = this.$store.getters['user/GET_USER'];
            return user ? `${user.firstName} ${user.lastName}` : '';
        },
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
.box {
    border: 4px solid;
    border-radius: 32px;
    padding: 16px;
    margin: 8px;
}
</style>