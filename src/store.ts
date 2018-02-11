import Vue from 'vue';
import Vuex from 'vuex';
import {
  MutationTree,
  ActionTree,
  ActionContext,
} from 'vuex';
import {
  NovelInfo,
  Episode,
  searchNovel,
  fetchEpisodes,
  fetchEpisodeText,
} from './api';

Vue.use(Vuex);

class State {
  public searchResults: NovelInfo[] = [];
  public episodes: Episode[] = [];
  public episodeText: string = '';
}

const mutations = {
  updateSearchResults(state: State, results: NovelInfo[]) {
    state.searchResults = results;
  },
  updateEpisodes(state: State, episodes: Episode[]) {
    state.episodes = episodes;
  },
  updateEpisodeText(state: State, text: string) {
    state.episodeText = text;
  },
} as MutationTree<State>;

const actions = {
  search(context: ActionContext<State, any>, word: string) {
    searchNovel(word).then((data) => {
      context.commit('updateSearchResults', data);
    });
  },
  getEpisodes(context: ActionContext<State, any>, ncode: string) {
    fetchEpisodes(ncode).then((episodes) => {
      context.commit('updateEpisodes', episodes);
    });
  },
  getEpisodeText(context: ActionContext<State, any>, [ncode, id]: string[]) {
    fetchEpisodeText(ncode, id).then((text) => {
      context.commit('updateEpisodeText', text);
    });
  },
} as ActionTree<State, any>;

export default new Vuex.Store({
  state: new State(),
  mutations,
  actions,
});
