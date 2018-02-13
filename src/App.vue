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
    <v-toolbar app fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Naro Reader</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data() {
    return {
      drawer: null,
    };
  },
});
</script>

<style>
.navigation-drawer a {
  text-decoration: none;
}
</style>
