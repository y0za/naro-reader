<template>
  <v-toolbar app fixed>
    <v-toolbar-side-icon v-on:click.stop="toggleDrawer"></v-toolbar-side-icon>
    <v-toolbar-title>Naro Reader</v-toolbar-title>
  </v-toolbar>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
} from 'vue-property-decorator';

@Component
export default class AppBar extends  Vue {
  @Prop()
  public toggleDrawer!: () => void;
}
</script>
