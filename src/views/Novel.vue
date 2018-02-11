<template>
  <div>
    <el-table
      v-bind:data="episodes"
      v-on:row-click="showEpisode"
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
  name: 'Novel',

  computed: {
    ncode(): string {
      return this.$route.params.ncode;
    },
    episodes(): Episode[] {
      return this.$store.state.episodes as Episode[];
    },
  },

  methods: {
    showEpisode(episode: Episode) {
      this.$router.push({
        name: 'episode',
        params: {
          ncode: this.ncode,
          id: episode.id,
        },
      });
    },
  },

  created() {
    this.$store.dispatch('getEpisodes', this.ncode);
  },
});
</script>
