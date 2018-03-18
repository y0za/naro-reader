<template>
  <div id="naro-reader-alert">
    <v-alert
      v-bind:type="alert.type"
      v-model="alert.active"
    >{{ alert.message }}</v-alert>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  mapState,
} from 'vuex';
import AlertState from '../store/module/alert-state';

export default Vue.extend({
  name: 'Alert',

  computed: {
    ...mapState(['alert']),
  },
});
</script>

<style>
#naro-reader-alert {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
}
</style>
