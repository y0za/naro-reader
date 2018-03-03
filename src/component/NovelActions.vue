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
  </div>
</template>

<script lang="ts">
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

  get bookmarkIconColor() {
    return this.isBookmarked ? 'yellow darken-2' : 'grey';
  }
}
</script>
