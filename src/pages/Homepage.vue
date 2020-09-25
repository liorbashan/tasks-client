<template>
    <v-container justify="center" class="white pa-2" fluid>
        <v-row class="header-wrapper justify-center ma-auto">
            <v-col align="left" col="2">
                <h4 class="black--text">Hi, {{user}}</h4>
            </v-col>
        </v-row>
        <v-divider light></v-divider>
        <v-row v-if="spaceId" class="justify-center ma-auto">
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
        <v-row v-else class="justify-center ma-auto">
            <v-col>
                <h3>Seems like you are not part of any space.</h3>
                <h5>Please join a space to use the Shopping and Task lists:</h5>
                <v-form
                    class="mt-3"
                    ref="selectSpaceForm"
                    @keydown.native.esc="close()"
                    v-model="spaceSelectionFormValid"
                    lazy-validation
                >
                    <v-col class="pa-0" cols="6">
                        <v-select
                            light
                            outlined
                            dense
                            :items="spacesList"
                            item-text="title"
                            item-value="id"
                            label="Select Space:"
                            :rules="requiredRule"
                        ></v-select>
                    </v-col>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ConfirmBox from '../components/ConfirmBox';
import { EventBus } from '../eventBus';
import { mapGetters } from 'vuex';
import * as spaceService from '../services/spaceService';
import space from '../store/modules/space';
export default {
    name: 'Homepage',
    components: {},
    data() {
        return {
            spaceSelectionFormValid: false,
            applicationName: process.env.VUE_APP_APPLICATION_NAME || '',
            spacesList: [],
            requiredRule: [(v) => !!v || 'Name is required'],
        };
    },
    computed: {
        user() {
            const user = this.$store.getters['user/GET_USER'];
            return user ? `${user.firstName} ${user.lastName}` : '';
        },
        spaceId() {
            return this.user.spaceId;
        },
    },
    async created() {
        if (!this.spaceId) {
            this.spacesList = await spaceService.getAllSpaces().catch((error) => {
                EventBus.$emit('SHOW_ERROR', `Failed to load spaces list: ${error.message}`);
            });
            console.log(this.spacesList);
        }
    },
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
h3,
h5 {
    font-weight: 400;
}
</style>