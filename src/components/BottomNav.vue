<template>
    <div id="bottomnav">
      <v-bottom-navigation 
        app
        fixed
        bottom
        class="bottom"
      >
        <v-btn 
          value="home"
          :to="{ name: 'Home' }"
        >
          <span>Home</span>
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn 
          value="atlantic"
          :to="{ name: 'Club Goal' }"
        >
          <span>Club Goal</span>
          <v-icon>mdi-timer-sand</v-icon>
        </v-btn>
        <v-btn 
          value="sessions"
          :to="{ name: 'Sessions' }"
        >
          <span>Sessions</span>
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
        <v-btn 
          value="paddlespots"
          :to="{ name: 'PaddleSpots' }"
        >
          <span>Paddle Spots</span>
          <v-icon>mdi-map-marker-check</v-icon>
        </v-btn>
      </v-bottom-navigation>
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

</style>