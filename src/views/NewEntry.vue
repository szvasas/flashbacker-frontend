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
                    prepend-icon="place"
                    placeholder="Location"
                    solo
                    :rules="locationRules"
                    v-model="location"
            />
            <v-menu>
                <template v-slot:activator="{ on }">
                    <v-text-field
                            v-model="dateHappened"
                            prepend-icon="event"
                            readonly
                            solo
                            v-on="on"
                    />
                </template>
                <v-date-picker v-model="dateHappened" no-title/>
            </v-menu>

            <v-btn
                    :disabled="!storyFormValid"
                    color="success"
                    class="mr-4"
                    @click="save"
            >
                Save
            </v-btn>

        </v-form>
    </v-container>
</template>

<script>
  export default {
    name: "NewEntry",
    data: () => ({
      storyFormValid: false,
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
      save() {
        if (this.$refs.storyForm.validate()) {
          console.log("valid")
        }
      }
    }
  }
</script>

<style scoped>

</style>