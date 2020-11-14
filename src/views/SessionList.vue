<template>
 <v-content>
    <v-container
      fluid
    >
      <v-row
        align="start"
        justify="center"
        v-for="item in sessions"
        :key="item.id"
      >
        <v-col>
          <router-link
            :to="{ name: 'Session', params: { id: item.id } }"
          >
            <v-card
              class="mx-auto"
              max-width="600"
            >
              <!-- <v-img
                class="white--text align-end"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
                <v-card-title>Top 10 Australian beaches</v-card-title>
              </v-img> -->
              <v-card-title v-html="item.title.rendered"></v-card-title>

              <v-card-text class="text--primary">
                <div v-html="item.acf.description"></div>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  color="green"
                  text
                >
                  Explore
                </v-btn>
              </v-card-actions>
            </v-card>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
// @ is an alias to /src

export default {
  data: () => ({
      drawer: null,
      sessions: [],
    }),
  mounted () {
    this.$http.get("https://sessions.norwichcanoeclub.co.uk/wp-json/wp/v2/sessions?per_page=100")
    .then((result) => {
      this.sessions = result.data
    })
  }
};
</script>

<style scoped>
  .v-content {
    margin-top: 0px;
  }
</style>