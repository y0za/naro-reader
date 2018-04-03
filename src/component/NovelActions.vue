<template>
  <div>
    <v-btn 
      icon
      v-on:click="toggleBookmarked"
    >
      <v-icon
        v-bind:color="bookmarkIconColor"
      >star</v-icon>
    </v-btn>
    <v-menu offset-y>
      <v-btn
        icon
        slot="activator"
      >
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile
          v-bind:href="originalPageUrl"
          target="_blank"
        >
          <v-list-tile-title>Original Page</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
declare var NARO_BASE_URL: string;
import {
  Vue,
  Component,
  Prop,
} from 'vue-property-decorator';

@Component
export default class NovelActions extends  Vue {
  @Prop()
  public isBookmarked!: boolean;

  @Prop()
  public toggleBookmarked!: () => void;

  @Prop()
  public ncode!: string;

  get bookmarkIconColor() {
    return this.isBookmarked ? 'yellow darken-2' : 'grey';
  }

  get originalPageUrl() {
    return NARO_BASE_URL + this.ncode + '/';
  }
}
</script>

<style>
.menu-link {
  text-decoration: none;
  color: inherit;
}
</style>
