<template>
    <v-container fluid>
        <v-form
                ref="storyForm"
                v-model="storyFormValid"
        >
            <v-textarea
                    outlined
                    filled
                    :rules="textRules"
                    :counter="250"
                    rows="7"
                    v-model="text"
            />

            <v-text-field
                    ref="locationTextField"
                    class="ml-1 mb-1"
                    v-show="showLocationField"
                    prepend-icon="place"
                    placeholder="Location"
                    solo
                    :rules="locationRules"
                    v-model="location"
            />

            <v-menu v-if="showDateHappenedField">
                <template v-slot:activator="{ on }">
                    <v-text-field
                            class="ml-1 mb-1"
                            v-model="dateHappened"
                            prepend-icon="event"
                            readonly
                            solo
                            v-on="on"
                    />
                </template>
                <v-date-picker v-model="dateHappened" no-title/>
            </v-menu>

            <v-btn class="mb-6" icon v-if="!showLocationField" @click="showAndFocusLocationField()">
                <v-icon>place</v-icon>
            </v-btn>
            <v-btn class="mb-6" icon v-if="!showDateHappenedField" @click="showDateHappenedField = !showDateHappenedField">
                <v-icon>event</v-icon>
            </v-btn>

            <v-col cols="12" sm="3">
                <v-btn
                        :disabled="!storyFormValid"
                        color="success"
                        class="mr-4"
                        @click="save"
                >
                    Save
                </v-btn>
            </v-col>
            <v-snackbar v-model="snackbar" :timeout="1000" bottom>
                {{ snackBarMessage }}
            </v-snackbar>
        </v-form>
    </v-container>
</template>

<script>
  import restClient from '@/restclient'

  export default {
    name: "NewEntry",
    data: () => ({
      snackbar: false,
      snackBarMessage: '',
      snackBarMessageSuccess: "Entry is successfully saved!",
      storyFormValid: false,
      showLocationField: false,
      showDateHappenedField: false,
      textRules: [
        v => !!v || "Story text is required",
        v => (v.length <= 250) || "The length of the story is too long"
      ],
      locationRules: [
        v => (!v || v.length <= 20) || "The max length of the location field is 20."
      ],
      text: '',
      location: '',
      dateHappened: new Date().toISOString().substr(0, 10)
    }),
    methods: {
      showAndFocusLocationField() {
        this.showLocationField = true;
        this.$nextTick(this.$refs.locationTextField.focus)
      },
      async save() {
        if (this.$refs.storyForm.validate()) {
          const body = {
            "location": this.location,
            "dateHappened": this.dateHappened,
            "text": this.text
          };

          try {
            await restClient.post(this.$store.state.storyEndpointUrl, body);
            this.snackbar = true;
            this.snackBarMessage = this.snackBarMessageSuccess
          } catch (e) {
            this.snackbar = true;
            this.snackBarMessage = e.message;
            console.error(e)
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
