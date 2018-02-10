<template>
  <div>
    <el-table
      v-bind:data="episodes"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="Episode">
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Episode } from '../api';

export default Vue.extend({
  name: 'Title',

  computed: {
    episodes(): Episode[] {
      return this.$store.state.episodes as Episode[];
    },
  },

  created() {
    const ncode = this.$route.params.ncode;
    this.$store.dispatch('getEpisodes', ncode);
  },
});
</script>
