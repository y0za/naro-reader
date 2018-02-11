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
    const id = this.$route.params.id;
    this.$store.dispatch('getChapterText', [ncode, id]);
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
  padding: 20px;
  -webkit-writing-mode: vertical-rl;
  -ms-writing-mode: tb-rl;
  writing-mode: vertical-rl;
}
</style>
