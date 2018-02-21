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
    ...mapState(['bookmarked']),
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
