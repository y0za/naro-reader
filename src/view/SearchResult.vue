<template>
  <v-list two-line>
    <v-list-tile
      v-for="novel in searchResults"
      v-bind:key="novel.ncode"
      v-on:click="showNovel(novel)">
      <v-list-tile-content>
        <v-list-tile-title>{{ novel.title }}</v-list-tile-title>
        <v-list-tile-sub-title>{{ novel.writer }}</v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue';
import NovelInfo from '../entity/NovelInfo';

export default Vue.extend({
  name: 'SearchResult',

  computed: {
    searchResults(): NovelInfo[] {
      return this.$store.state.searchResults as NovelInfo[];
    },
  },

  methods: {
    showNovel(novelInfo: NovelInfo) {
      this.$router.push({
        name: 'novel',
        params: { ncode: novelInfo.ncode },
      });
    },
  },

  created() {
    const word = this.$route.query.q;
    this.$store.dispatch('search', word);
  },
});
</script>
