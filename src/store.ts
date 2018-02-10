import Vue from 'vue';
import Vuex from 'vuex';
import {
  MutationTree,
  ActionTree,
  ActionContext,
} from 'vuex';
import {
  TitleInfo,
  Episode,
  searchTitle,
  fetchEpisodes,
} from './api';

Vue.use(Vuex);

class State {
  public searchResults: TitleInfo[] = [];
  public episodes: Episode[] = [];
}

const mutations = {
  updateSearchResults(state: State, results: TitleInfo[]) {
    state.searchResults = results;
  },
  updateEpisodes(state: State, episodes: Episode[]) {
    state.episodes = episodes;
  },
} as MutationTree<State>;

const actions = {
  search(context: ActionContext<State, any>, word: string) {
    searchTitle(word).then((data) => {
      context.commit('updateSearchResults', data);
    });
  },
  getEpisodes(context: ActionContext<State, any>, ncode: string) {
    fetchEpisodes(ncode).then((episodes) => {
      context.commit('updateEpisodes', episodes);
    });
  },
} as ActionTree<State, any>;

export default new Vuex.Store({
  state: new State(),
  mutations,
  actions,
});
