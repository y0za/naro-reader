<template>
  <div class="home">
    <v-text-field
       light
       solo
       prepend-icon="search"
       v-bind:prepend-icon-cb="search"
       v-model="word"
       v-on:keypress.enter="search"
       placeholder="Search">
    </v-text-field>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',

  data() {
    return {
      word: '',
    };
  },

  methods: {
    search() {
      this.$router.push({
        name: 'searchResult',
        query: { q: this.word },
      });
    },
  },
});
</script>
