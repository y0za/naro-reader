import Vue from 'vue';
import Vuex from 'vuex';
import {
  MutationTree,
  ActionTree,
  ActionContext,
} from 'vuex';
import {
  searchNovel,
  fetchChapters,
  fetchChapterText,
} from './api';
import NovelInfo from './entities/NovelInfo';
import Chapter from './entities/Chapter';

Vue.use(Vuex);

class State {
  public searchResults: NovelInfo[] = [];
  public chapters: Chapter[] = [];
  public chapterText: string = '';
}

const mutations = {
  updateSearchResults(state: State, results: NovelInfo[]) {
    state.searchResults = results;
  },
  updateChapters(state: State, chapters: Chapter[]) {
    state.chapters = chapters;
  },
  updateChapterText(state: State, text: string) {
    state.chapterText = text;
  },
} as MutationTree<State>;

const actions = {
  search(context: ActionContext<State, any>, word: string) {
    searchNovel(word).then((data) => {
      context.commit('updateSearchResults', data);
    });
  },
  getChapters(context: ActionContext<State, any>, ncode: string) {
    fetchChapters(ncode).then((chapters) => {
      context.commit('updateChapters', chapters);
    });
  },
  getChapterText(context: ActionContext<State, any>, [ncode, id]: string[]) {
    fetchChapterText(ncode, id).then((text) => {
      context.commit('updateChapterText', text);
    });
  },
} as ActionTree<State, any>;

export default new Vuex.Store({
  state: new State(),
  mutations,
  actions,
});
