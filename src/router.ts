import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import SearchResult from './views/SearchResult.vue';
import Title from './views/Title.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/search',
      name: 'searchResult',
      component: SearchResult,
    },
    {
      path: '/title/:ncode',
      name: 'title',
      component: Title,
    },
  ],
});
