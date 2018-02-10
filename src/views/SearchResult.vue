<template>
  <div>
    <el-table
      v-bind:data="searchResults"
      v-on:row-click="showTitle"
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
import { TitleInfo } from '../api';

export default Vue.extend({
  name: 'SearchResult',

  computed: {
    searchResults(): TitleInfo[] {
      return this.$store.state.searchResults as TitleInfo[];
    },
  },

  methods: {
    showTitle(titleInfo: TitleInfo) {
      this.$router.push({
        name: 'title',
        params: { ncode: titleInfo.ncode },
      });
    },
  },

  created() {
    const word = this.$route.query.q;
    this.$store.dispatch('search', word);
  },
});
</script>
