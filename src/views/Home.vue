<template>
 <v-content>
    <v-container
      fluid
    >
      <v-row
        align="start"
        justify="center"
      >
        <v-col>
          <v-card
            class="mx-auto"
            max-width="600"
          >
            <v-img
              class="white--text align-end"
              height="240px"
              src="https://norwichcanoeclub.co.uk/wp-content/uploads/2018/09/McGregor-Win-Landscape-Denim-1.jpg"
            >
              <v-card-title>Norwich Canoe Club App</v-card-title>
            </v-img>
            <v-card-text class="text--primary">
              <div>This small web app lists a number of Norwich Canoe Club resources including sessions recorded on Zoom during lockdown and our group distance tracker.</div>
              <!-- <div class="mt-3">
                This web app has been put together incredibly quickly, however any feedback would be 
                greatly appreciated. Please email: <a href="mailto:matt.parkes@outlook.com">matt.parkes@outlook.com</a> with any feedback or ideas.
              </div> -->
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row
        align="start"
        justify="center"
      >
        <v-col>
          <v-card
              class="mx-auto"
              max-width="600"
              v-if="loaded"
          >
            <v-card-title>Atlantic Crossing</v-card-title>
            <v-card-text class="text--primary">
              <h3>Our Monthly Goal is: {{ goal }} miles</h3>
              <h3>We are currently at {{ total }} miles</h3>
              <div class="mt-4"></div>
              <v-progress-linear
                  :active="active"
                  :background-opacity="opacity"
                  :bottom="bottom"
                  :buffer-value="buffer"
                  :height="height"
                  :indeterminate="indeterminate"
                  :query="query"
                  :rounded="rounded"
                  :stream="stream"
                  :striped="striped"
                  :top="top"
                  :value="value"
                  color="#008000"
              ></v-progress-linear>
              <p class="mt-4 mb-0">Keep adding your miles to the form on the Club Goal page.</p>
            </v-card-text>
          </v-card>
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
      total: 0,
      goal: 3000,
      absolute: false,
      active: true,
      opacity: 0.3,
      bottom: false,
      buffer: 100,
      fixed: false,
      height: 20,
      indeterminate: false,
      query: false,
      rounded: true,
      stream: false,
      striped: true,
      top: false,
      value: 0,
      loaded: false
    }),
  mounted () {
    this.$http.get("https://www.sessions.norwichcanoeclub.co.uk/wp-json/wp/v2/sessions")
    .then((result) => {
    
      this.sessions = result.data
    })
    this.total = 0;
    this.$http.get("https://www.sessions.norwichcanoeclub.co.uk/wp-json/wp/v2/mileage?per_page=100")
    .then((result) => {
        this.entries = result.data;
        for(var i = 0; i < this.entries.length; i++){
            var current = this.entries[i];
            this.total += parseFloat(current.acf.mileage);
        }
        this.total = this.total.toFixed(2)
        this.loaded = true;
        this.value = (this.total / this.goal) * 100
    })
  }
};
</script>

<style scoped>
  .v-content {
    margin-top: 0px;
  }

  .v-card__title {
    font-size: 1.4rem;
  }
</style>y