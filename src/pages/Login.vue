<template>
    <v-container>
        <h1>login</h1>
        <v-btn v-if="showLoginButton" @click="login()">with google</v-btn>
    </v-container>
</template>
<script>
import { EventBus } from '@/eventBus';
import * as authService from '../services/authService';
export default {
    name: 'Login',
    data() {
        return {
            tokenName: process.env.VUE_APP_TOKEN_NAME,
            userToken: null,
            userData: null,
            showLoginButton: false,
        };
    },
    created() {
        this.getTokenFromLocalStorage();
        if (this.userToken) {
            this.userData = authService.parseJwt(this.userToken);
            if (authService.isTokenExpired(this.userData.exp)) {
                console.log('token expired!');
                this.userData = null;
                this.showLoginButton = true;
            } else {
                this.setUserData();
            }
        } else {
            this.showLoginButton = true;
        }
    },
    methods: {
        getTokenFromLocalStorage() {
            this.userToken = authService.getTokenFromLocalStorage();
        },
        async login() {
            await authService.signInWithGoogle().catch((error) => {
                console.log(error.message);
                EventBus.$emit('SHOW_ERROR', error.message);
            });
            this.getTokenFromLocalStorage();
            if (this.userToken) {
                this.userData = authService.parseJwt(this.userToken);
                this.setUserData();
            }
        },
        async setUserData() {
            EventBus.$emit('SHOW_LOADER', 1);
            this.$store.dispatch('user/SET_USER', this.userData);
            if (this.userData.spaceId) {
                await this.$store.dispatch('space/GET_SPACE_BY_ID', this.userData.spaceId);
            }
            EventBus.$emit('HIDE_LOADER', 1);
            this.$router.push('/');
        },
    },
};
</script>
<style lang="scss" scoped>
</style>