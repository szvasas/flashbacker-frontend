<template>
    <v-container fluid>
        <v-card v-if="this.loadedStories == null">
            <v-card-title>Loading...</v-card-title>
        </v-card>
        <v-col v-else v-for="story in this.loadedStories" :key="story.id" class="pb-0">
            <v-card>
                <v-card-title>{{ story.text }}</v-card-title>
                <v-card-actions>
                    <v-container>{{ story.location }}</v-container>
                    <v-container>{{ story.dateHappened }}</v-container>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-container>
</template>

<script>
  import restClient from '@/restclient'

  export default {
    name: "BrowseEntries",
    mounted() {
      this.loadStories()
    },
    destroyed() {
      this.loadedStories = null
    },
    data: () => ({
      loadedStories: null
    }),
    methods: {
      async loadStories() {
        let response = await restClient.get("/stories");
        let embeddedData = response.data._embedded
        if (embeddedData) {
          this.loadedStories = [...embeddedData.stories]
        } else {
          this.loadedStories = []
        }
      }
    }
  }
</script>

<style scoped>

</style>
