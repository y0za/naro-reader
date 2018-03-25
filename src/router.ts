import Vue from 'vue';
import Router from 'vue-router';
import Home from './view/Home.vue';
import SearchResult from './view/SearchResult.vue';
import BookmarkedNovels from './view/BookmarkedNovels.vue';
import Novel from './view/Novel.vue';
import Chapter from './view/Chapter.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash',
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
      path: '/bookmarked-novels',
      name: 'bookmarkedNovels',
      component: BookmarkedNovels,
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
