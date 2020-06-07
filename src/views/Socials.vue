<template>
 <v-content>
    <v-container
      fluid
    >
      <v-row
        align="start"
        justify="center"
        v-for="item in socials"
        :key="item.id"
      >
        <v-col>
            <a target="_blank" v-bind:href="item.acf.social_link">
                <v-card
                class="mx-auto"
                max-width="600"
                height="150"
                >
                    <v-list-item three-line>
                        <v-list-item-content>
                            <v-list-item-title class="headline mb-1" v-html="item.title.rendered"></v-list-item-title>
                            <v-list-item-subtitle class="pr-5" v-html="item.acf.description"></v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-avatar
                            size="80"
                            color="grey"
                        >
                            <img
                                v-bind:src="item.acf.icon"
                                alt="social media icon"
                            >
                        </v-list-item-avatar>
                    </v-list-item>
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
      socials: [],
    }),
  mounted () {
    this.$http.get("https://www.sessions.norwichcanoeclub.co.uk/wp-json/wp/v2/social")
    .then((result) => {
        this.socials = result.data
    })
  }
};
</script>

<style scoped>
  .v-content {
    margin-top: 0px;
  }

  .v-list-item__subtitle, .v-list-item {
      height: 100%;
  }
</style>