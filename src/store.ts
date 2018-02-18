import Vue from 'vue';
import Vuex from 'vuex';
import {
  MutationTree,
  ActionTree,
  ActionContext,
} from 'vuex';
import {
  searchNovel,
  fetchNovelAndChapters,
  fetchChapterText,
} from './api';
import Novel from './entity/Novel';
import Chapter from './entity/Chapter';

Vue.use(Vuex);

class State {
  public searchResults: Novel[] = [];
  public novel?: Novel;
  public chapters: Chapter[] = [];
  public chapterText: string = '';
}

const mutations = {
  updateSearchResults(state: State, results: Novel[]) {
    state.searchResults = results;
  },
  updateNovel(state: State, novel: Novel) {
    state.novel = novel;
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
  getNovelAndChapters(context: ActionContext<State, any>, ncode: string) {
    fetchNovelAndChapters(ncode).then(([novel, chapters]: [Novel, Chapter[]]) => {
      context.commit('updateNovel', novel);
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
