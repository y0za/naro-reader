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
      <el-table-column
        prop="postedDate"
        v-bind:formatter="dateFormatter"
        label="Posted Date">
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import fecha from 'fecha';
import Chapter from '../entities/Chapter';

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
    this.$store.dispatch('getChapters', this.ncode);
  },
});
</script>
