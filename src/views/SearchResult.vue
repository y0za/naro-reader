<template>
  <div>
    <el-table
      v-bind:data="searchResults"
      v-on:row-click="showNovel"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="Title">
      </el-table-column>
      <el-table-column
        prop="writer"
        label="Author"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NovelInfo from '../entities/NovelInfo';

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
