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
              <!-- <v-img
                class="white--text align-end"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
                <v-card-title>Top 10 Australian beaches</v-card-title>
              </v-img> -->
              <v-card-title>Donate to NHS Charities</v-card-title>

              <v-card-text class="text--primary">
                <div>This app has been built voluntarily, however, if you find it useful then please consider donating a small amount to NHS Charities.</div>
                <div class="mt-4">
                    <a 
                        target="_blank" 
                        href="//widgets.justgiving.com/Button/Redirect?p=eyJUZXh0IjoiTkhTIENoYXJpdGllcyBUb2dldGhlciIsIklkIjoiNzk3ZDljN2EtNDJmNi00M2JlLThmYTYtMWQyYWMxZjgzYTJiIiwiQ2hhcml0eUlkIjoyODA4MjE4LCJTaXplIjoicyIsIlJlZmVyZW5jZSI6IiIsIlR5cGUiOiJDaGFyaXR5RG9uYXRlIn0="
                    >
                        <v-img 
                            width="280"
                            src="//widgets.justgiving.com/Button?p=eyJUZXh0IjoiTkhTIENoYXJpdGllcyBUb2dldGhlciIsIklkIjoiNzk3ZDljN2EtNDJmNi00M2JlLThmYTYtMWQyYWMxZjgzYTJiIiwiQ2hhcml0eUlkIjoyODA4MjE4LCJTaXplIjoicyIsIlJlZmVyZW5jZSI6IiIsIlR5cGUiOiJDaGFyaXR5RG9uYXRlIn0="
                        ></v-img>
                    </a>
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
    data: () => ({
      drawer: null,
    }),

  }
</script>

<style scoped>

</style>