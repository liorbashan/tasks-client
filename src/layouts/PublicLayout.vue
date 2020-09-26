<template>
    <v-container class="pa-0 white align-start" fill-height fluid>
        <Header />
        <slot />
        <Footer />
    </v-container>
</template>

<script>
import Header from '../components/Header';
import Footer from '../components/Footer';
export default {
    name: 'PublicLayout',
    components: { Header, Footer },
};
</script>

<style>
</style>