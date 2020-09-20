<template>
    <v-container>
        <h1>login</h1>
        <v-btn v-if="showLoginButton" @click="login()">with google</v-btn>
    </v-container>
</template>
<script>
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
            });
            this.getTokenFromLocalStorage();
            if (this.userToken) {
                this.userData = authService.parseJwt(this.userToken);
                this.setUserData();
            }
        },
        async setUserData() {
            this.$store.dispatch('user/SET_USER', this.userData);
            await this.$store.dispatch('space/GET_SPACE_BY_ID', this.userData.spaceId);
            this.$router.push('/');
        },
    },
};
</script>
<style lang="scss" scoped>
</style>