<template>
  <div id="chapter-reader" ref="reader" v-html="chapterText">
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Chapter',

  computed: {
    chapterText(): string {
      return this.$store.state.chapterText as string;
    },
  },
  created() {
    const ncode = this.$route.params.ncode;
    const id = parseInt(this.$route.params.id, 10);
    const payload = {
      ncode,
      id,
    };
    this.$store.dispatch('getChapterText', payload);
  },
  watch: {
    '$store.state.chapterText'() {
      this.$nextTick(() => {
        const reader = this.$refs.reader as HTMLElement;
        window.scrollTo(reader.scrollWidth, 0);
      });
    },
  },
});
</script>

<style>
#chapter-reader {
  padding: 10px;
  overflow-x: scroll;
  width: 100%;
  height: 94%;
  -webkit-writing-mode: vertical-rl;
  -ms-writing-mode: tb-rl;
  writing-mode: vertical-rl;
}
</style>
