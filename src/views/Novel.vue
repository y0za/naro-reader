<template>
  <div>
    <el-table
      v-bind:data="chapters"
      v-on:row-click="showChapter"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="Chapter">
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Chapter } from '../api';

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
  },

  created() {
    this.$store.dispatch('getChapters', this.ncode);
  },
});
</script>
