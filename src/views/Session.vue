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
              v-if="loaded"
            >
              <!-- <v-img
                class="white--text align-end"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
                <v-card-title>Top 10 Australian beaches</v-card-title>
              </v-img> -->
              <v-card-title v-html="session.title.rendered"></v-card-title>

              <v-card-text class="text--primary">
                <div v-html="session.acf.description"></div>
                <div v-if="youtube != ''">
                  <iframe
                    class="mt-2"
                    v-bind:src="youtube"
                    frameborder="0" 
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>    
                  </iframe>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          
        </v-row>
      </v-container>
    </v-content>

</template>

<script>
  export default {
    props: ['id'],
    data: () => ({
      drawer: null,
      session: [],
      youtube: "",
      loaded: false
    }),
    mounted () {
      this.$http.get("https://sessions.norwichcanoeclub.co.uk/wp-json/wp/v2/sessions/"+this.id)
      .then((result) => {
        this.session = result.data;
        if(this.session.acf.youtube_url != ""){
          this.youtube = this.session.acf.youtube_url;
          this.youtube = "https://www.youtube.com/embed/" + this.youtube.replace("https://youtu.be/", "")
        }
        this.loaded = true;
      })
    }
  }
</script>

<style scoped>
  iframe {
    width: 100%;
    height: 300px
  }
</style>