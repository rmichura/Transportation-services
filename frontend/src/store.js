import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import router from "@/router";

const API = `http://localhost:3000/api/`

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: null,
        userId: null,
    },
    getters: {
        isAuth: state => state.token !== null,
    },
    mutations: {
        auth(state, payload) {
            state.token = payload.token;
            state.userId = payload.userId;
        },
        clearAuth(state) {
            state.token = null;
            state.userId = null;
        },
    },
    actions: {
        async login({commit, dispatch}, payload) {
            try {
                let response = await axios.post(`${API}login`, payload)
                commit('auth', {
                    token: response.data.apiToken,
                    userId: response.data._id
                })

                const now = new Date();
                const endDate = new Date(now.getTime() + 30 * 60000);
                localStorage.setItem('token', response.data.apiToken);
                localStorage.setItem('userId', response.data._id);
                localStorage.setItem('expires', endDate);
            } catch (e) {
                console.log(e)
            }
        },

        autoLogin({commit, dispatch}) {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }
            const userId = localStorage.getItem('userId');
            if (!userId) {
                return;
            }
            const expirationDate = new Date(localStorage.getItem('expires'));
            const now = new Date();
            if (now >= expirationDate) {
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                localStorage.removeItem('expires');
                return;
            }
            commit('auth', {
                token,
                userId
            })

            setTimeout(() => {
                dispatch('logout');
            }, expirationDate.getTime() - now.getTime());
        },

        logout({commit}) {
            commit('clearAuth')
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('expires');
            router.push('/')
        },

        async register({commit}, payload) {
            try {
                await axios.post(`${API}user`, payload)
            } catch (e) {
                console.log(e)
            }
        },
    }
})
