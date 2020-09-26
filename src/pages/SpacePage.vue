<template>
    <v-container class="pa-0 white align-start" fill-height fluid>
        <v-row justify="space-around">
            <v-card width="100%">
                <v-img class="opacity" v-if="space" height="200px" referrerpolicy="no-referrer" :src="space.imageUrl">
                    <v-app-bar flat color="rgba(0, 0, 0, 0)">
                        <router-link class="white--text" to="/">
                            <v-icon dark>mdi-home</v-icon>
                        </router-link>
                        <v-toolbar-title class="title white--text pl-3">{{ space.title }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn color="white" icon>
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </v-app-bar>
                    <v-card-title class="white--text mt-8">
                        <v-avatar size="56">
                            <img referrerpolicy="no-referrer" alt="user" :src="user.picture" />
                        </v-avatar>
                        <p v-if="user" class="ml-3">{{ user.firstName }} {{ user.lastName }}</p>
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
import * as authService from '../services/authService';
export default {
    name: 'SpacePage',
    props: ['id'],
    data() {
        return {};
    },
    created() {},
    computed: {
        space() {
            let space = this.$store.getters['space/GET_SPACE'];
            if (!space) {
                const payload = { id: this.id };
                this.$store.dispatch('space/FETCH_SPACE', payload);
            }
            return space;
        },
        user() {
            let user = this.$store.getters['user/GET_USER'];
            if (!user) {
                const userToken = authService.getTokenFromLocalStorage();
                const userData = authService.parseJwt(userToken);
                const fetchUserPayload = { email: userData.email };
                user = this.$store.dispatch('user/FETCH_USER', fetchUserPayload).catch((error) => {
                    console.log(error.message);
                    EventBus.$emit('SHOW_ERROR', error.message);
                });
            }
            return user;
        },
    },
};
</script>

<style lang="scss">
.opacity {
    .v-image__image--cover {
        opacity: 0.5;
    }
}
.v-image__image--cover {
    opacity: 0.5;
}
</style>