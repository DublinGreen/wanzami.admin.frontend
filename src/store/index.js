import { createStore } from 'vuex'

export default createStore({
  state: {
    token            :  null,
    noAuthBackendUrl : "http://localhost:9085/graphql",
    authBackendUrl   : "http://localhost:8081/graphql",
    redirectTimeout  : 2000,
    appName          : "Wanzami",
  },
  getters: {
    token: (state) => state.token,
    redirectTimeout: (state) => state.redirectTimeout,
    noAuthBackendUrl: (state) => state.noAuthBackendUrl,
    authBackendUrl: (state) => state.authBackendUrl,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    CLEAR_TOKEN(state) {
      state.token = null;
      localStorage.removeItem('token');
    }
  },
  actions: {
    initializeToken({ commit }) {
      const token = localStorage.getItem('token');
      if (token) {
        commit('SET_TOKEN', token);
      }
    },
    setToken({ commit }, token) {
      commit('SET_TOKEN', token);
    },
    clearToken({ commit }) {
      commit('CLEAR_TOKEN');
    },

  },
  modules: {
  }
})
