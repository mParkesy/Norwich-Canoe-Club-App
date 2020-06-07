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
            <v-select
                class="filter-drop"
                :items="rivers"
                label="River Filter"
                :dark="true"
                item-value="river"
                v-on:change="filter"
            >
            </v-select>
        </v-col>
    </v-row>
      <v-row
        align="start"
        justify="center"
        v-for="item in filter_spots"
        :key="item.title"
      >
        <v-col>
            <a target="_blank" v-bind:href="item.maps">
                <v-card
                    class="mx-auto"
                    max-width="600"
                    height="240"
                >
                    <v-card-title v-html="item.title"></v-card-title>
                    <v-card-text class="text--primary">
                        <div v-html="item.info"></div>
                        <div>Postcode: {{ item.postcode }}</div>
                        <div>River: {{ item.river }}</div>
                        <v-chip
                            :large="true"
                            :ripple="true"
                            :href="item.maps"
                            target="_blank"
                            class="mt-5"
                            color="green"
                            text-color="white"
                        >
                            Open in Google Maps
                        </v-chip>
                    </v-card-text>
                </v-card>
            </a>
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
      spots: [],
      filter_spots: [],
        rivers: []
    }),
    methods: {
      filter(x){
          if(x == "All"){
              this.filter_spots = this.spots;
          } else {
            this.filter_spots = [];
            for(var i = 0; i < this.spots.length; i++){
                var current = this.spots[i];
                if(current.river == x){
                    this.filter_spots.push(current)
                    console.log("hello")
                }
            }
          }

      },
      getLatLong(postcode){
        this.$http.get("https://api.postcodes.io/postcodes/"+postcode)
        .then((response) => {
            return {
                "lat" : response.data.result.latitude,
                "long" : response.data.result.longitude
            }
        })
      }
  },
  mounted () {
      this.rivers.push("All")
    this.$http.get("https://www.sessions.norwichcanoeclub.co.uk/wp-json/wp/v2/spots?per_page=100")
    .then((response) => {
        var arr = response.data
        var latlong = [];
        var promises = [];
        for(var x = 0; x < arr.length; x++){
            promises.push(this.$http.get("https://api.postcodes.io/postcodes/"+arr[x].acf.postcode)
                .then((result) => {
                    var key = result.data.result.postcode.replace(" ", "")
                    latlong[key] = {
                        "lat" : result.data.result.latitude,
                        "long" : result.data.result.longitude
                    };
                })
            );
        }

        Promise.all(promises).then(() => {
            for(var i = 0; i < arr.length; i++){
                var current = arr[i];
                var maps_str = "https://www.google.com/maps/search/?api=1&query="+latlong[current.acf.postcode].lat+","+latlong[current.acf.postcode].long;
                var list = {
                    "id" : current.id,
                    "maps" : maps_str,
                    "lat" : latlong[current.acf.postcode].lat,
                    "long" : latlong[current.acf.postcode].long,
                    "postcode" : current.acf.postcode,
                    "info" : current.acf.info,
                    "river" : current.acf.river,
                    "title" : current.title.rendered
                }
                this.spots.push(list);
                this.filter_spots.push(list);
                if(this.rivers.indexOf(current.acf.river) === -1){
                    this.rivers.push(current.acf.river);

                }
            }
        });


    })
  }
};
</script>

<style scoped>
  .v-chip__content {
      padding: 10px;
  }

  .filter-drop {
      max-width: 600px;
      margin: auto;
  }
</style>