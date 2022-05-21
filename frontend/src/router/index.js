import Vue from 'vue'
import VueRouter from 'vue-router'
import TheMain from "@/views/Home";
import Login from "@/views/Login";
import Register from "@/views/Register";

import store from "@/store";
import Customer from "@/views/Customer";

Vue.use(VueRouter)

store.dispatch('autoLogin')

const authGuard = (to, from, next) => {
    if (store.getters.isAuth) {
        next();
    } else {
        next({name: 'login'});
    }
}

const notAuthGuard = (to, from, next) => {
    if (!store.getters.isAuth) {
        next();
    } else {
        next({name: 'profile'});
    }
}

const routes = [
    {
        path: '/',
        name: 'TheMain',
        component: TheMain,
        beforeEnter: notAuthGuard
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: notAuthGuard
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        beforeEnter: notAuthGuard
    },
    {
        path: '/customer',
        name: 'Customer',
        component: Customer,
        beforeEnter: authGuard
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

if (store.getters.isAuth) {
    const expirationDate = new Date(localStorage.getItem('expires'));
    const now = new Date();

    if (expirationDate <= now) {
        store.dispatch('logout');
    } else {
        setTimeout(() => {
            store.dispatch('logout');
        }, expirationDate.getTime() - now.getTime());
    }
}