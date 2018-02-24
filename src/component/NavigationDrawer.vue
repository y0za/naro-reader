<template>
  <v-navigation-drawer v-model="active" class="navigation-drawer" app fixed>
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
    <v-footer height="auto" fixed>
      <v-flex text-xs-center>
        &copy;2018 y0za
      </v-flex>
    </v-footer>
  </v-navigation-drawer>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
} from 'vue-property-decorator';

@Component
export default class NavigationDrawer extends  Vue {
  @Prop()
  public active!: () => boolean;
}
</script>
