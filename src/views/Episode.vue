<template>
  <div id="episode-reader" ref="reader" v-html="episodeText">
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Episode } from '../api';

export default Vue.extend({
  name: 'Episode',

  computed: {
    episodeText(): string {
      return this.$store.state.episodeText as string;
    },
  },
  created() {
    const ncode = this.$route.params.ncode;
    const id = this.$route.params.id;
    this.$store.dispatch('getEpisodeText', [ncode, id]);
  },
  watch: {
    '$store.state.episodeText'() {
      this.$nextTick(() => {
        const reader = this.$refs.reader as HTMLElement;
        window.scrollTo(reader.scrollWidth, 0);
      });
    },
  },
});
</script>

<style>
#episode-reader {
  padding: 20px;
  -webkit-writing-mode: vertical-rl;
  -ms-writing-mode: tb-rl;
  writing-mode: vertical-rl;
}
</style>
