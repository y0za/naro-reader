<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" class="navigation-drawer" app fixed>
      <v-list dense>
        <router-link v-bind:to="{ name: 'home' }">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
      </v-list>
    </v-navigation-drawer>
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
    AppBar,
  },
});
</script>

<style>
.navigation-drawer a {
  text-decoration: none;
}
</style>
