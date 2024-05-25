import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState({
        // 配置选项
    })],
    state: {
        authority: "none",
        username: "",
        token: "",
        accountId: "",
    },
    getters: {},
    mutations: {
        setAuthority(state, authority) {
            state.authority = authority;
        },
        setUsername(state, username) {
            state.username = username;
        },
        setToken(state, token) {
            state.token = token;
        },
        setAccountId(state, accountId) {
            state.accountId = accountId;
        },

        resetState(state) {
            // 重置所有状态到初始值
            Object.assign(state, {
                authority: "none",
                username: "",
                token: ""
            });
        }
    },
    actions: {
        updateAuthority({ commit }, authority) {
            commit('setAuthority', authority);
        },
        updateUsername({ commit }, username) {
            commit('setUsername', username);
        },
        updateToken({ commit }, token) {
            commit('setToken', token);
        },
        updateAccountId({ commit }, accountId) {
            commit('setAccountId', accountId);
        },

        logout({ commit }) {
            commit('resetState');
        }
    },
    modules: {}
})