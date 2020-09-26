<template>
    <v-container class="pa-2 white align-start" fill-height fluid>
        <v-row class="header-wrapper justify-center ma-auto">
            <v-col align="left" col="2">
                <h4 v-if="user" class="black--text">Hi, {{ user.firstName }} {{ user.lastName }}</h4>
                <h4 v-else class="black--text">Welcome</h4>
            </v-col>
        </v-row>
        <v-divider light></v-divider>
        <v-row v-if="spaceId" class="justify-center ma-auto">
            <router-link to="/shoppingList">
                <v-icon class="box" size="200" color="light-blue darken-1">mdi-cart-outline</v-icon>
            </router-link>
            <router-link to="/tasks">
                <v-icon class="box" size="200" color="deep-orange darken-1">mdi-clipboard-list-outline</v-icon>
            </router-link>
        </v-row>
        <v-row v-else class="justify-center ma-auto">
            <v-col v-if="!user">
                <h3>Please login</h3>
            </v-col>
            <v-col v-else>
                <h3>Seems like you are not part of any space.</h3>
                <h5>Please join a space to use the Shopping and Task lists:</h5>
                <v-form class="mt-3" ref="selectSpaceForm" v-model="spaceSelectionFormValid" lazy-validation>
                    <v-row class="justify-start">
                        <v-col class="p-auto" cols="7">
                            <v-select light outlined dense :items="spacesList" item-text="title" item-value="id" label="Select Space:" :rules="requiredRule" v-model="selectedSpaceId"></v-select>
                        </v-col>
                        <v-col class="p-auto" cols="4">
                            <v-btn light :disabled="!spaceSelectionFormValid" color="success" depressed @click="joinSpace()">Join Space</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ConfirmBox from '../components/ConfirmBox';
import { EventBus } from '../eventBus';
import * as spaceService from '../services/spaceService';
import space from '../store/modules/space';
export default {
    name: 'Homepage',
    components: {},
    data() {
        return {
            spaceSelectionFormValid: false,
            selectedSpaceId: null,
            applicationName: process.env.VUE_APP_APPLICATION_NAME || '',
            spacesList: [],
            requiredRule: [(v) => !!v || 'required'],
        };
    },
    computed: {
        user() {
            return this.$store.getters['user/GET_USER'];
        },
        spaceId() {
            return this.user ? this.user.spaceId : null;
        },
    },
    async created() {
        if (!this.spaceId) {
            this.spacesList = await spaceService.getAllSpaces().catch((error) => {
                EventBus.$emit('SHOW_ERROR', `Failed to load spaces list: ${error.message}`);
            });
        }
    },
    methods: {
        async joinSpace() {
            if (this.$refs.selectSpaceForm.validate()) {
                const updatePayload = {
                    email: this.user.email,
                    spaceId: this.selectedSpaceId,
                };
                const user = await this.$store.dispatch('user/UPDATE_USER', updatePayload);
                if (user.spaceId) {
                    const getSpacePayload = { id: user.spaceId };
                    await this.$store.dispatch('space/FETCH_SPACE', getSpacePayload);
                }
            }
        },
    },
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
h3,
h5 {
    font-weight: 400;
}
</style>