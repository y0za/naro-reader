<template>
  <div class="home">
    <el-input placeholder="Please input" v-model="word" class="input-with-select">
      <el-button slot="append" icon="el-icon-search" v-on:click="search"></el-button>
    </el-input>
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
