import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import router from "@/router";

const API = `http://localhost:3000/api/`
const TOKEN = localStorage.getItem('token')

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: null,
        userId: null,
        role: null,
        user: [],
        orders: [],
        users: [],
        allOrders: [],
        cars: [],
        drivers: [],
        driver: [],
    },
    getters: {
        isAuth: state => state.token !== null,
        yourRole: state => state.role,
        currentUser: state => state.userId,
        orderOfCustomer: state => state.orders,
        users: state => state.users,
        allOrders: state => state.allOrders,
        cars: state => state.cars,
        drivers: state => state.drivers,
        driver: state => state.driver
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
            state.orders = [];
            state.user = [];
            state.users = [];
            state.allOrders = [];
            state.cars = [];
            state.drivers = [];
            state.driver = []
        },
        user(state, payload) {
            state.user = payload.user
        },
        orders(state, payload) {
            state.orders = payload.orders
        },
        users(state, payload) {
            state.users = payload.users
        },
        allOrders(state, payload) {
            state.allOrders = payload.allOrders
        },
        cars(state, payload) {
            state.cars = payload.cars
        },
        drivers(state, payload) {
            state.drivers = payload.drivers
        },
        driver(state, payload) {
            state.driver = payload.driver
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
                const endDate = new Date(now.getTime() + 30 * 600000);
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
                localStorage.removeItem('user');
                localStorage.removeItem('orders');
                localStorage.removeItem('users');
                localStorage.removeItem('allOrders');
                localStorage.removeItem('cars');
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
            localStorage.removeItem('user');
            localStorage.removeItem('orders');
            localStorage.removeItem('users');
            localStorage.removeItem('cars');
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
            let id = payload._id
            try {
                await axios.put(`${API}user/${id}`, payload, {
                    headers: {
                        'Authorization': `Bearer ${TOKEN}`
                    }
                })
            } catch (e) {
                console.log(e)
            }
        },

        async getCurrentUser({commit}) {
            try {
                let id = localStorage.getItem('userId')
                let response = await axios.get(`${API}user/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${TOKEN}`
                    }
                })
                commit('user', {
                    user: response.data.user
                })
                localStorage.setItem('user', JSON.stringify(response.data.user))
            } catch (e) {
                console.log(e)
            }
        },

        async saveOrder({commit}, payload) {
            try {
                await axios.post(`${API}order`, payload, {
                    headers: {
                        'Authorization': `Bearer ${TOKEN}`
                    }
                })
            } catch (e) {
                console.log(e)
            }
        },

        async getOrders({commit}) {
            try {
                let order = []
                let id = localStorage.getItem('userId')
                let response = await axios.get(`${API}orders`, {
                    headers: {
                        'Authorization': `Bearer ${TOKEN}`
                    }
                })
                response.data.orders.forEach(data => {
                    if (data.user === id) {
                        order.push(data)
                    }
                })
                commit('orders', {
                    orders: order
                })
            } catch (e) {
                console.log(e)
            }
        },

        async getAllOrders({commit}) {
            try {
                let response = await axios.get(`${API}orders`, {
                    headers: {
                        'Authorization': `Bearer ${TOKEN}`
                    }
                })
                commit('allOrders', {
                    allOrders: response.data.orders
                })
            } catch (e) {
                console.log(e)
            }
        },

        async removeOrder({state}, id) {
            try {
                let idOrder = state.orders[id]._id
                await axios.delete(`${API}order/${idOrder}`, {
                    headers: {
                        'Authorization': `Bearer ${TOKEN}`
                    }
                })
                state.orders.splice(id, 1)
            } catch (e) {
                console.log(e)
            }
        },

        async updateOrder({commit}, [id, payload]) {
            try {
                await axios.put(`${API}order/${id}`, payload, {
                    headers: {
                        'Authorization': `Bearer ${TOKEN}`
                    }
                })
            } catch (e) {
                console.log(e)
            }
        },

        async getUsers({commit}) {
            try {
                let response = await axios.get(`${API}users`, {
                    headers: {
                        'Authorization': `Bearer ${TOKEN}`
                    }
                })
                commit('users', {
                    users: response.data.users
                })
            } catch (e) {
                console.log(e)
            }
        },

        async removeUser({state}, user) {
            try {
                await axios.delete(`${API}user/${user._id}`, {
                    headers: {
                        'Authorization': `Bearer ${TOKEN}`
                    }
                })
                state.users.forEach((data, value) => {
                    if (user._id === data._id) {
                        state.users.splice(value, 1)
                    }
                })
            } catch (e) {
                console.log(e)
            }
        },

        async saveCar({commit}, payload) {
            try {
                await axios.post(`${API}car`, payload, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${TOKEN}`
                    }
                })
            } catch (e) {
                console.log(e)
            }
        },

        async getCars({commit}) {
            try {
                let response = await axios.get(`${API}cars`, {
                    headers: {
                        'Authorization': `Bearer ${TOKEN}`
                    }
                })
                commit('cars', {
                    cars: response.data.cars
                })
            } catch (e) {
                console.log(e)
            }
        },

        async updateCar({commit}, [id, payload]) {
            try {
                await axios.put(`${API}car/${id}`, payload, {
                    headers: {
                        'Authorization': `Bearer ${TOKEN}`
                    }
                })
            } catch (e) {
                console.log(e)
            }
        },

        async removeCar({state}, id) {
            try {
                await axios.delete(`${API}car/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${TOKEN}`
                    }
                })
                state.cars.forEach((data, value) => {
                    if (id === data._id) {
                        state.cars.splice(value, 1)
                    }
                })
            } catch (e) {
                console.log(e)
            }
        },

        async getDrivers({commit}) {
            try {
                let response = await axios.get(`${API}drivers`, {
                    headers: {
                        'Authorization': `Bearer ${TOKEN}`
                    }
                })
                commit('drivers', {
                    drivers: response.data.drivers
                })
            } catch (e) {
                console.log(e)
            }
        },

        async saveDriver({commit}, payload) {
            try {
                await axios.post(`${API}driver`, payload, {
                    headers: {
                        'Authorization': `Bearer ${TOKEN}`
                    }
                })
            } catch (e) {
                console.log(e)
            }
        },

        async updateDriver({commit}, [id, payload]) {
            try {
                await axios.put(`${API}driver/${id}`, payload, {
                    headers: {
                        'Authorization': `Bearer ${TOKEN}`
                    }
                })
            } catch (e) {
                console.log(e)
            }
        },

        async removeDriver({state}, id) {
            try {
                await axios.delete(`${API}driver/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${TOKEN}`
                    }
                })
                state.drivers.forEach((data, value) => {
                    if (id === data._id) {
                        state.drivers.splice(value, 1)
                    }
                })
            } catch (e) {
                console.log(e)
            }
        },

        async getDriver({commit}, id) {
            try {
                let response = await axios.get(`${API}driver/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${TOKEN}`
                    }
                })
                commit('driver', {
                    driver: response.data.driver
                })
            } catch (e) {
                console.log(e)
            }
        },

    }
})
