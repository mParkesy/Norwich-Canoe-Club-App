<template>
    <v-content>
        <div class="text-center">
            <v-snackbar
                v-model="submitted"
                :timeout="3000"
                :bottom="true"
                color="green"
                class="alert"
            >
                Success!
            </v-snackbar>
            <v-snackbar
                v-model="submittedError"
                :timeout="3000"
                :bottom="true"
                color="red"
                class="alert"
            >
                There was an error!
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
              <v-card-title>Add Your Mileage</v-card-title>

              <v-card-text class="text--primary">
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >
                    <v-text-field
                        v-model="name"
                        :counter="20"
                        :rules="nameRules"
                        label="Name"
                        required
                    ></v-text-field>
                    <!-- <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                    ></v-text-field> -->
                    <v-text-field
                        v-model="number"
                        :rules="numberRules"
                        label="Distance"
                        required
                        type="number"
                    ></v-text-field>
                    <v-switch 
                        v-model="distanceType"
                        color="green"
                        label="Miles(default) or KM">
                    </v-switch>
                    <v-btn
                        :disabled="!valid"
                        color="success"
                        class="mr-4"
                        @click="validate"
                    >
                        Submit
                    </v-btn>

                    <v-btn
                        color="error"
                        class="mr-4"
                        @click="reset"
                    >
                        Reset Form
                    </v-btn>
                </v-form>
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
                    <p class="mt-4 mb-0">Keep adding your miles to this form.</p>
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
        entries : null,
        submitted: false,
        submittedError: false,
        valid: true,
        name: '',
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 20) || 'Name must be less than 20 characters',
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        number : '',
        numberRules: [
            v => !!v || 'Distance Required',        
        ],
        loaded: false,
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
        distanceType: 0
    }),

    methods: {
        updateProgress(){
            this.total = 0;
            this.$http.get("https://sessions.norwichcanoeclub.co.uk/wp-json/wp/v2/mileage?per_page=100")
            .then((result) => {
                this.entries = result.data;
                for(var i = 0; i < this.entries.length; i++){
                    var current = this.entries[i];
                    console.log(parseFloat(current.acf.mileage))
                    this.total += parseFloat(current.acf.mileage);
                }
                this.total = this.total.toFixed(2);
                this.loaded = true;
                this.value = (this.total / this.goal) * 100
            })
        },
        validate () {
            var validate = this.$refs.form.validate();
            if(validate){
                var distance = this.number;
                if(this.distanceType != 0){
                    distance = distance * 0.62137;
                }
                this.$http.get(
                    "https://api.ipify.org/?format=json", 
                ).then((result) => {
                    var bodyFormData = new FormData();
                    bodyFormData.set('name', this.name);
                    bodyFormData.set('mileage', distance);
                    bodyFormData.set('ip', result.data.ip)
                    this.$http.post(
                        "https://sessions.norwichcanoeclub.co.uk/new-mileage.php", 
                        bodyFormData
                    ).then((response) => {
                        if(response.data.success == true){
                            this.loaded = false;
                            this.updateProgress();
                            this.name = "";
                            this.number = "";
                            this.submitted = true;
                            this.reset();
                        } else {
                            this.submittedError = true;
                        }
                    })
                })
            }
        },
        reset () {
            this.$refs.form.reset()
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        }
    },

    mounted () {
        this.updateProgress();
    }

  }
</script>

<style scoped>
    .v-input--switch {
        margin-top: 0px;
    }

    .alert {
        margin-bottom: 60px;
    }
</style>