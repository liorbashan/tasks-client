<template>
    <div id="login">
        <div class="layout-padding">
            <div class="mid-bg"></div>
            <div class="login-card shadow-4 bg-white">
                <h5 class="login-title">LOGIN</h5>
                <div class="text-center" style="margin-top: 30px">
                    <q-btn color="primary" @click="login">
                        <span>LOG IN</span>
                    </q-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { QSpinnerDots } from 'quasar';
// import { FirebaseService } from '../services/firebase';
import * as FirebaseService from '../services/firebase';
export default {
    components: {
        QSpinnerDots,
    },
    data() {
        return {
            userData: {},
        };
    },
    methods: {
        login: async function () {
            this.userData = await FirebaseService.signInWithGoogle();
            console.log(this.userData);
        },
    },
};
</script>