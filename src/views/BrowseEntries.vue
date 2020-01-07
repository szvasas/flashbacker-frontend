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
        let endpointUrl = await this.$store.dispatch('retrieveStoryEndpointUrl')
        let response = await restClient.get(endpointUrl);
        let embeddedData = response.data._embedded
        if (embeddedData) {
          this.loadedStories = [...this.sortStories(embeddedData.stories)]
        } else {
          this.loadedStories = []
        }
      },
      // The method sorts descending by dateHappened and within each dateHappened group by timestampCreated ascending.
      sortStories(storiesArray) {
        return storiesArray.sort(function (s1, s2) {
          if (s1.dateHappened > s2.dateHappened) {
            return -1;
          } else if (s2.dateHappened > s1.dateHappened) {
            return 1;
          } else {
            if (s1.timestampCreated < s2.timestampCreated) {
              return -1;
            } else if (s2.timestampCreated < s1.timestampCreated) {
              return 1;
            } else {
              return 0
            }
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
