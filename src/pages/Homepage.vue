<template>
    <v-container class="pa-0 white" fluid>
        <!-- Greeting -->
        <div class="inherit-width pa-2">
            <h4 v-if="user" class="black--text">Hi, {{ user.firstName }} {{ user.lastName }}</h4>
            <h4 v-else class="black--text">Welcome</h4>
        </div>
        <v-divider light></v-divider>
        <!-- Content -->
        <div class="inherit-width pa-2">
            <!-- No User [Start] -->
            <div v-if="!user"><h3>Please login</h3></div>
            <!-- No User [End] -->
            <!-- Yes User [Start] -->
            <!-- Yes Space [Start] -->
            <div v-if="user && spaceId" class="inherit-width">
                <router-link :to="{ name: 'Space', params: { id: spaceId } }">
                    <v-btn>
                        <v-icon>mdi-table-arrow-left</v-icon>
                    </v-btn>
                </router-link>
            </div>
            <!-- Yes Space [End] -->
            <!-- No Space [Start] -->
            <div v-if="user && !spaceId" class="inherit-width">
                <v-col>
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
            </div>
            <!-- No Space [End] -->
            <!-- Yes User [End] -->
        </div>
    </v-container>
</template>

<script>
import { EventBus } from '../eventBus';
import * as spaceService from '../services/spaceService';
// import space from '../store/modules/space';
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