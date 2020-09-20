<template>
    <v-container justify="center" class="white pa-2" fluid>
        <v-row class="header-wrapper justify-center ma-auto">
            <v-col align="left" col="2">
                <h1 class="black--text">Homepage</h1>
            </v-col>
            <v-col align="right" col="2">
                
            </v-col>
        </v-row>
        <v-divider light></v-divider>
        <v-row class="justify-center">
            
        </v-row>
        <ConfirmBox
            :message="confirmBox.message"
            v-if="confirmBox.show"
            @close="getConfirmBoxValue"
        ></ConfirmBox>
    </v-container>
</template>

<script>
import ConfirmBox from '../components/ConfirmBox';
import { EventBus } from '../eventBus';
import { mapGetters } from 'vuex';
export default {
    name: 'Homepage',
    components: { ConfirmBox },
    data() {
        return {
            applicationName: process.env.VUE_APP_APPLICATION_NAME || '',
            confirmBox: {
                show: false,
                message: null,
                payload: null,
            },
        };
    },
    created() {},
    computed: {
        ...mapGetters({
            // projectsList: ['projects/GET_ALL_PROJECTS'],
            // numOfProjects: ['projects/GET_PROJECT_COUNT'],
        }),
    },
    methods: {
        async editProject(id) {
            // this.projToEdit = await this.$store.getters['projects/GET_PROJECT_BY_ID'](id);
        },
        
        async deleteProject(id) {
            // const res = await this.$store.dispatch('projects/DELETE_PROJECT', id).catch((error) => {
            //     console.log(error);
            //     EventBus.$emit('SHOW_ERROR', error);
            // });
            // if (res) {
            //     EventBus.$emit('SHOW_SUCCESS', `Project Deleted!`);
            // }
        },
        
    },
};
</script>

<style lang="scss" scoped>
.header-wrapper {
    max-width: 1050px;
    // border-bottom: 1px solid #e1e1e1;
}
</style>