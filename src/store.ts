import Vue from 'vue';
import Vuex from 'vuex';
import {
  MutationTree,
  ActionTree,
  ActionContext,
} from 'vuex';
import {
  TitleInfo,
  searchTitle,
} from './api';

Vue.use(Vuex);

class State {
  public searchResults: TitleInfo[] = [];
}

const mutations = {
  updateSearchResults(state: State, results: TitleInfo[]) {
    state.searchResults = results;
  },
} as MutationTree<State>;

const actions = {
  search(context: ActionContext<State, any>, word: string) {
    searchTitle(word).then((data) => {
      context.commit('updateSearchResults', data);
    });
  },
} as ActionTree<State, any>;

export default new Vuex.Store({
  state: new State(),
  mutations,
  actions,
});
