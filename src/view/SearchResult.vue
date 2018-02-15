<template>
  <v-list two-line>
    <v-list-tile
      v-for="novel in searchResults"
      v-bind:key="novel.ncode"
      v-on:click="showNovel(novel)">
      <v-list-tile-content>
        <v-list-tile-title>{{ novel.title }}</v-list-tile-title>
        <v-list-tile-sub-title>{{ novel.writerName }}</v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue';
import Novel from '../entity/Novel';

export default Vue.extend({
  name: 'SearchResult',

  computed: {
    searchResults(): Novel[] {
      return this.$store.state.searchResults as Novel[];
    },
  },

  methods: {
    showNovel(novel: Novel) {
      this.$router.push({
        name: 'novel',
        params: { ncode: novel.ncode },
      });
    },
  },

  created() {
    const word = this.$route.query.q;
    this.$store.dispatch('search', word);
  },
});
</script>
