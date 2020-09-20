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
            this.userData = this.parseJwt(this.userToken);
            if (this.isTokenExpired(this.userData.exp)) {
                console.log('token expired!');
                this.userData = null;
                this.showLoginButton = true;
            } else {
                this.userData = this.parseJwt(this.userToken);
                this.setUserData();
            }
        } else {
            this.showLoginButton = true;
        }
    },
    methods: {
        getTokenFromLocalStorage() {
            this.userToken = localStorage.getItem(this.tokenName) ? localStorage.getItem(this.tokenName) : null;
        },
        async login() {
            await authService.signInWithGoogle().catch((error) => {
                console.log(error.message);
            });
            this.getTokenFromLocalStorage();
            if (this.userToken) {
                this.userData = this.parseJwt(this.userToken);
                this.setUserData();
            }
        },
        setUserData() {
            // TODO: set user to store, hide login button & route to homepage
            console.log('settin user data to store');
        },
        parseJwt(token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            /* eslint-disable function-paren-newline */
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(function (c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    })
                    .join('')
            );

            return JSON.parse(jsonPayload);
        },
        isTokenExpired(timestamp) {
            if (Date.now() >= timestamp * 1000) {
                return true;
            }
            return false;
        },
    },
};
</script>
<style lang="scss" scoped>
</style>