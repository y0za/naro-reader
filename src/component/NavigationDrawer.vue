<template>
  <v-navigation-drawer
    class="navigation-drawer"
    v-model="innerActive"
    v-on:input="updateActive"
    fixed temporary
  >
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
      <router-link v-bind:to="{ name: 'bookmarkedNovels' }">
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>bookmark</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Bookmarked Novels</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </router-link>
      <a href="https://github.com/y0za/naro-reader">
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>fab fa-github</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>GitHub</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </a>
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
  Watch,
} from 'vue-property-decorator';

@Component
export default class NavigationDrawer extends  Vue {
  @Prop()
  public active!: boolean;

  @Prop()
  public updateActive!: (active: boolean) => void;

  public innerActive = this.active;

  @Watch('active')
  public onActiveChanged(val: boolean) {
    if (val !== this.innerActive) {
      this.innerActive = val;
    }
  }
}
</script>
