<template>
  <v-app id="app">
    <navigation-drawer
      v-bind:active="drawer"
      v-bind:update-active="updateDrawer"
      v-model="drawer"
    />
    <app-bar v-bind:toggle-drawer="toggleDrawer"></app-bar>
    <v-content>
      <alert></alert>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Alert from './component/Alert.vue';
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

    updateDrawer(active: boolean) {
      this.drawer = active;
    },
  },

  components: {
    Alert,
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
