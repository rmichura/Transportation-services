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
        role: null,
        user: [],
    },
    getters: {
        isAuth: state => state.token !== null,
        yourRole: state => state.role,
        currentUser: state => state.user,
    },
    mutations: {
        auth(state, payload) {
            state.token = payload.token;
            state.userId = payload.userId;
            state.role = payload.role;
        },
        clearAuth(state) {
            state.token = null;
            state.userId = null;
            state.role = null;
            state.user = [];
        },
        user(state, payload) {
            state.user = payload.user
        }
    },
    actions: {
        async login({commit, dispatch, state}, payload) {
            try {
                let response = await axios.post(`${API}login`, payload)
                commit('auth', {
                    token: response.data.apiToken,
                    userId: response.data._id,
                    role: response.data.role
                })

                const now = new Date();
                const endDate = new Date(now.getTime() + 30 * 60000);
                localStorage.setItem('token', response.data.apiToken);
                localStorage.setItem('userId', response.data._id);
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('expires', endDate);
                dispatch('getCurrentUser')
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
            const role = localStorage.getItem('role');
            if (!role) {
                return;
            }
            const user = localStorage.getItem('user');
            if (!user) {
                return;
            }
            const expirationDate = new Date(localStorage.getItem('expires'));
            const now = new Date();
            if (now >= expirationDate) {
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                localStorage.removeItem('role');
                localStorage.removeItem('expires');
                localStorage.removeItem('user')
                return;
            }
            commit('auth', {
                token,
                userId,
                role,
            })

            setTimeout(() => {
                dispatch('logout');
            }, expirationDate.getTime() - now.getTime());
        },

        logout({commit}) {
            commit('clearAuth')
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('role');
            localStorage.removeItem('expires');
            localStorage.removeItem('user')
            router.push('/')
        },

        async register({commit}, payload) {
            try {
                await axios.post(`${API}user`, payload)
            } catch (e) {
                console.log(e)
            }
        },

        async updateUser({commit}, payload) {
            let id = localStorage.getItem('userId')
            try {
                await axios.put(`${API}user/${id}`, payload)
            } catch (e) {
                console.log(e)
            }
        },

        async getCurrentUser({commit}) {
            try {
                let id = localStorage.getItem('userId')
                let response = await axios.get(`${API}user/${id}`)
                commit('user', {
                    user: response.data.user
                })
                localStorage.setItem('user', JSON.stringify(response.data.user))
            } catch (e) {
                console.log(e)
            }
        }
    }
})