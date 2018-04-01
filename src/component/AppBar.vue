<template>
  <v-toolbar app fixed>
    <v-toolbar-side-icon v-on:click.stop="toggleDrawer"></v-toolbar-side-icon>
    <v-toolbar-title>
      <router-link
        v-bind:to="{ name: 'home' }"
        class="title-link"
      >Naro Reader</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <novel-actions
      v-if="$route.name === 'novel'"
      v-bind:is-bookmarked="bookmarked"
      v-bind:toggle-bookmarked="toggleBookmarked"
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
import {
  mapState,
  mapGetters,
  mapActions,
} from 'vuex';
import NovelActions from './NovelActions.vue';

@Component({
  components: {
    NovelActions,
  },
  computed: {
    ...mapState([
      'showProgress',
    ]),
    ...mapGetters([
      'bookmarked',
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
}
</script>

<style>
.title-link {
  text-decoration: none;
  color: inherit;
}
.progress-bar {
  position: absolute;
  bottom: -3px;
  margin: 0;
}
</style>
