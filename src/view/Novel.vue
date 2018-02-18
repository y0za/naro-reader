<template>
  <v-list two-line>
    <v-list-tile
      v-for="chapter in chapters"
      v-bind:key="chapter.id"
      v-on:click="showChapter(chapter)">
      <v-list-tile-content>
        <v-list-tile-title>{{ chapter.title }}</v-list-tile-title>
        <v-list-tile-sub-title>{{ dateFormatter(chapter) }}</v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue';
import fecha from 'fecha';
import Chapter from '../entity/Chapter';

export default Vue.extend({
  name: 'Novel',

  computed: {
    ncode(): string {
      return this.$route.params.ncode;
    },
    chapters(): Chapter[] {
      return this.$store.state.chapters as Chapter[];
    },
  },

  methods: {
    showChapter(chapter: Chapter) {
      this.$router.push({
        name: 'chapter',
        params: {
          ncode: this.ncode,
          id: chapter.id,
        },
      });
    },
    dateFormatter(chapter: Chapter): string {
      return fecha.format(chapter.postedDate, 'YYYY-MM-DD HH:mm');
    },
  },

  created() {
    this.$store.dispatch('getNovelAndChapters', this.ncode);
  },
});
</script>
