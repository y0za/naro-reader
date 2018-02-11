import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import SearchResult from './views/SearchResult.vue';
import Novel from './views/Novel.vue';
import Chapter from './views/Chapter.vue';

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
      path: '/novel/:ncode',
      name: 'novel',
      component: Novel,
    },
    {
      path: '/novel/:ncode/:id',
      name: 'chapter',
      component: Chapter,
    },
  ],
});
