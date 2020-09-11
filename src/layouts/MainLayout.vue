<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>
          <q-avatar>
            <img :src="userData.picture">
          </q-avatar>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
export default {
  name: 'MainLayout',
  components:{
    EssentialLink,
  },
  data(){
    return {
      userData:null,
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title:'Login',
          caption:'',
          icon:'login',
          link:'login'
        }
      ],
    }
  },
  computed:{
    userToken(){
      return localStorage.getItem('token');
    }
  },
  created(){
    this.userData = this.parseJwt(this.userToken);
    if(this.isExpired()){
      console.log('token expired');
      // TODO: sent to login page;
      // this.$router.push('/login');
    }
  },
  methods:{
    parseJwt (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    },
    isExpired(){
      if (Date.now() >= this.userData.exp * 1000) {
        return false;
      }
      return true;
    }
  }
}
</script>
