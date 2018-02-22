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
import bookmarkedNovels from './repository/bookmarked-novels';

Vue.use(Vuex);

class State {
  public searchResults: Novel[] = [];
  public novel?: Novel;
  public bookmarked: boolean = false;
  public chapters: Chapter[] = [];
  public chapterText: string = '';
  public showProgress: boolean = false;
}

const mutations = {
  updateSearchResults(state: State, results: Novel[]) {
    state.searchResults = results;
  },
  updateNovel(state: State, novel: Novel) {
    state.novel = novel;
  },
  setBookmarked(state: State) {
    state.bookmarked = true;
  },
  resetBookmarked(state: State) {
    state.bookmarked = false;
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
    searchNovel(word).then((data) => {
      context.commit('updateSearchResults', data);
    });
  },
  getNovelAndChapters(context: ActionContext<State, any>, ncode: string) {
    fetchNovelAndChapters(ncode).then(([novel, chapters]: [Novel, Chapter[]]) => {
      context.commit('updateNovel', novel);
      context.commit('updateChapters', chapters);
      bookmarkedNovels.isBookmarked(novel.ncode).then((bookmarked: boolean) => {
        if (bookmarked) {
          context.commit('setBookmarked');
        }
      });
    });
  },
  getChapterText(context: ActionContext<State, any>, [ncode, id]: string[]) {
    fetchChapterText(ncode, id).then((text) => {
      context.commit('updateChapterText', text);
    });
  },
  toggleBookmarked(context: ActionContext<State, any>) {
    const novel = context.state.novel;
    if (novel == null) {
      return;
    }

    if (context.state.bookmarked) {
      context.commit('resetBookmarked');
      bookmarkedNovels.deleteBookmark(novel.ncode);
    } else {
      context.commit('setBookmarked');
      bookmarkedNovels.bookmark(novel);
    }
  },
} as ActionTree<State, any>;

export default new Vuex.Store({
  state: new State(),
  mutations,
  actions,
});
