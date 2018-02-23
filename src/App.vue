<template>
  <v-app id="app">
    <navigation-drawer v-bind:active="drawer"></navigation-drawer>
    <app-bar v-bind:toggle-drawer="toggleDrawer"></app-bar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import NavigationDrawer from './component/NavigationDrawer.vue';
import AppBar from './component/AppBar.vue';

export default Vue.extend({
  name: 'App',

  data() {
    return {
      drawer: false,
    };
  },

  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },

  components: {
    NavigationDrawer,
    AppBar,
  },
});
</script>

<style>
.navigation-drawer a {
  text-decoration: none;
}
</style>
