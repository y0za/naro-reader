import Vue from 'vue';
import Vuex from 'vuex';
import {
  GetterTree,
  MutationTree,
  ActionTree,
  ActionContext,
  ModuleTree,
} from 'vuex';
import {
  searchNovel,
  fetchNovelAndChapters,
  fetchChapterText,
} from '../api';
import Novel from '../entity/Novel';
import Chapter from '../entity/Chapter';
import novelRepository from '../repository/novel-repository';
import State from './state';
import alert from './module/alert';

Vue.use(Vuex);

const getters = {
  bookmarked(state: State): boolean {
    if (state.novel == null) {
      return false;
    }
    return state.novel.bookmarkedAt.getTime() > 0;
  },
} as GetterTree<State, any>;

const mutations = {
  updateSearchResults(state: State, results: Novel[]) {
    state.searchResults = results;
  },
  resetSearchResults(state: State) {
    state.searchResults = [];
  },
  updateNovel(state: State, novel: Novel) {
    Vue.set(state, 'novel', novel);
  },
  updateChapters(state: State, chapters: Chapter[]) {
    state.chapters = chapters;
  },
  updateChapterText(state: State, text: string) {
    state.chapterText = text;
  },
  showProgress(state: State) {
    state.showProgress = true;
  },
  hideProgress(state: State) {
    state.showProgress = false;
  },
} as MutationTree<State>;

const actions = {
  search(context: ActionContext<State, any>, word: string) {
    context.commit('resetSearchResults');
    context.commit('showProgress');
    searchNovel(word).then((data) => {
      context.commit('updateSearchResults', data);
    }).catch(() => {
      context.dispatch('alert/showError', 'Failed to serach novels.');
    }).then(() => {
      context.commit('hideProgress');
    });
  },
  getNovelAndChapters(context: ActionContext<State, any>, ncode: string) {
    context.commit('showProgress');
    fetchNovelAndChapters(ncode).then(([novel, chapters]: [Novel, Chapter[]]) => {
      context.commit('updateNovel', novel);
      context.commit('updateChapters', chapters);
      novelRepository.save(novel);
    }).catch(() => {
      context.dispatch('alert/showError', 'Failed to get the novel information.');
    }).then(() => {
      context.commit('hideProgress');
    });
  },
  getChapterText(context: ActionContext<State, any>, [ncode, id]: string[]) {
    fetchChapterText(ncode, id).then((text) => {
      context.commit('updateChapterText', text);
    }).catch(() => {
      context.dispatch('alert/showError', 'Failed to get the chapter text.');
    });
  },
  async toggleBookmarked(context: ActionContext<State, any>) {
    const novel = context.state.novel;
    if (novel == null) {
      return;
    }

    if (context.getters.bookmarked) {
      await novelRepository.deleteBookmark(novel.ncode);
    } else {
      await novelRepository.bookmark(novel.ncode);
    }
    const updatedNovel = await novelRepository.getByNcode(novel.ncode);
    context.commit('updateNovel', updatedNovel);
  },
} as ActionTree<State, any>;

const modules = {
  alert,
} as ModuleTree<State>;

export default new Vuex.Store({
  state: new State(),
  getters,
  mutations,
  actions,
  modules,
});
