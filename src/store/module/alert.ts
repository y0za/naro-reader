import {
  MutationTree,
  ActionTree,
  ActionContext,
  Module,
} from 'vuex';
import RootState from '../state';
import State from './alert-state';
import { AlertType } from './alert-state';

const alertDisplayTime = 6000;

interface ShowPayload {
  type: AlertType;
  message: string;
}

const mutations = {
  show(state: State, payload: ShowPayload) {
    state.active = true;
    state.type = payload.type;
    state.message = payload.message;
  },
  close(state: State) {
    state.active = false;
    state.message = '';
  },
} as MutationTree<State>;

const actions = {
  showSuccess(context: ActionContext<State, any>, message: string) {
    const payload = {
      type: 'success',
      message,
    } as ShowPayload;
    context.commit('show', payload);
    setTimeout(() => {
      context.commit('close');
    }, alertDisplayTime);
  },
  showInfo(context: ActionContext<State, any>, message: string) {
    const payload = {
      type: 'info',
      message,
    } as ShowPayload;
    context.commit('show', payload);
    setTimeout(() => {
      context.commit('close');
    }, alertDisplayTime);
  },
  showWarning(context: ActionContext<State, any>, message: string) {
    const payload = {
      type: 'warning',
      message,
    } as ShowPayload;
    context.commit('show', payload);
    setTimeout(() => {
      context.commit('close');
    }, alertDisplayTime);
  },
  showError(context: ActionContext<State, any>, message: string) {
    const payload = {
      type: 'error',
      message,
    } as ShowPayload;
    context.commit('show', payload);
    setTimeout(() => {
      context.commit('close');
    }, alertDisplayTime);
  },
} as ActionTree<State, RootState>;

export default {
  namespaced: true,
  state: new State(),
  mutations,
  actions,
} as Module<State, RootState>;
