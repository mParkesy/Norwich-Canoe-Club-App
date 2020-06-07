<template>
  <v-app id="inspire">
    <NavBar/>
    <router-view />
    <BottomNav/>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import BottomNav from '@/components/BottomNav.vue';
  export default {
    components: {
      NavBar,
      BottomNav
    },
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      sessions: [],
      activeBtn: 1
    }),
    created () {
      this.$vuetify.theme.dark = true
    },
   
  }
</script>

<style>
  a {
    text-decoration: none;
  }
  .bottom {
    align-items: center;
  }
</style>