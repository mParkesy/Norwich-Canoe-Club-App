<template>
    <div id="nav">
        <v-app-bar
        app
        clipped-left
        >
            <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
            <v-toolbar-title>
                <router-link
                    color="green"
                    :to="{ name: 'Home' }"
                >
                  <v-img
                    width="150"
                    src="https://norwichcanoeclub.co.uk/wp-content/uploads/2018/09/Norwich-Canoe-CLub-Logo-4.png"
                  >
                  </v-img>
                </router-link>
            </v-toolbar-title>
        </v-app-bar>
    </div>
</template>

<script>
  export default {

    data: () => ({
      drawer: null,
    }),

  }
</script>

<style scoped>
    .v-application a {
        color: #4CAF50 !important;
    }
</style>