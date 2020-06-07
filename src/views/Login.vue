<template>
 <v-content>
    <div class="text-center">
        <v-snackbar
            v-model="submittedError"
            :timeout="3000"
            :bottom="true"
            color="red"
            class="alert"
        >
            Login Incorrect!
        </v-snackbar>
    </div>
    <v-container
      fluid
    >
      <v-row
        align="start"
        justify="center"
      >
        <v-col>
            <v-card
                class="elevation-12 mx-auto"
                max-width="600"
            >
                <v-toolbar
                    color="green"
                    dark
                    flat
                >
                    <v-toolbar-title>Login</v-toolbar-title>
                </v-toolbar>
                <v-card-text class="pb-0">
                    <v-form>
                        <v-text-field
                            v-model="name"
                            label="Username"
                            name="username"
                            prepend-icon="mdi-account"
                            type="text"
                        ></v-text-field>

                        <v-text-field
                            v-model="password"
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="mdi-lock"
                            type="password"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
              <v-card-actions class="mb-5">
                <v-spacer></v-spacer>
                <v-btn
                    color="green"
                    @click="formSubmitted"
                >
                    Login
                </v-btn>
              </v-card-actions>
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
        name: "",
        password: "",
        submittedError: false
    }),
  methods: {
        formSubmitted(){
            var bodyFormData = new FormData();
            bodyFormData.set('username', this.name);
            bodyFormData.set('password', this.password);
            this.$http.post(
                "https://www.sessions.norwichcanoeclub.co.uk/login.php", 
                bodyFormData
            ).then((response) => {
                console.log(response)
                if (response.data.success == true){
                    console.log("yes")
                    localStorage.setItem("user", response.data.message)
                    this.$router.push('/')
                } else {
                    this.submittedError = true;
                    this.name = "";
                    this.password = "";
                }
            })
        }
  }
};
</script>

<style scoped>
  .v-content {
    margin-top: 0px;
  }

  .v-card__title h1 {

    margin: auto;
  }

  .alert {
      margin-bottom: 60px;
  }
</style>y