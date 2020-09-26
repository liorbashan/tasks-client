<template>
    <v-container class="pa-0 white align-start" fill-height fluid>
        <slot />
        <Footer />
    </v-container>
</template>

<script>
import Footer from '../components/Footer';
export default {
    name: 'AppLayout',
    components: { Footer },
};
</script>

<style>
</style>