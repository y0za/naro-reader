<template>
  <v-toolbar app fixed>
    <v-toolbar-side-icon v-on:click.stop="toggleDrawer"></v-toolbar-side-icon>
    <v-toolbar-title>Naro Reader</v-toolbar-title>
    <v-spacer></v-spacer>
    <novel-actions
      v-if="$route.name === 'novel'"
      v-bind:is-bookmarked="bookmarked"
      v-bind:toggle-bookmarked="toggleBookmarked"
      v-bind:reset-bookmarked="resetBookmarked"
    ></novel-actions>
    <v-progress-linear
      v-show="showProgress"
      height="3"
      class="progress-bar"
      v-bind:indeterminate="true"
    ></v-progress-linear>
  </v-toolbar>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
} from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import NovelActions from './NovelActions.vue';

@Component({
  components: {
    NovelActions,
  },
  computed: {
    ...mapState([
      'bookmarked',
      'showProgress',
    ]),
  },
  methods: {
    ...mapActions(['toggleBookmarked']),
  },
})
export default class AppBar extends  Vue {
  @Prop()
  public toggleDrawer!: () => void;

  get isBookmarked() {
    return this.$store.state.bookmarked;
  }

  public resetBookmarked() {
    this.$store.commit('resetBookmarked');
  }
}
</script>

<style>
.progress-bar {
  position: absolute;
  bottom: -3px;
  margin: 0;
}
</style>
