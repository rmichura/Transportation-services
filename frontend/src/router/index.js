import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home";
import Login from "@/views/Login";
import Register from "@/views/Register";

import store from "@/store";
import Customer from "@/views/user/Customer";
import Admin from "@/views/admin/Admin";
import Employee from "@/views/employee/Employee";
import NotFound from "@/views/NotFound";
import Account from "@/views/employee/Account";

Vue.use(VueRouter)

store.dispatch('autoLogin')

const userGuard = (to, from, next) => {
    if (store.getters.yourRole === 'user' && store.getters.isAuth) {
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

const adminGuard = (to, from, next) => {
    if (store.getters.yourRole === "admin" && store.getters.isAuth) {
        next();
    } else {
        next({name: 'admin'})
    }
}

const employeeGuard = (to, from, next) => {
    if (store.getters.yourRole === "employee" && store.getters.isAuth) {
        next();
    } else {
        next({name: 'employee'})
    }
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
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
        beforeEnter: userGuard
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        beforeEnter: adminGuard
    },
    {
        path: '/employee',
        name: 'employee',
        component: Employee,
        beforeEnter: employeeGuard
    },
    {
        path: '/employee/account',
        name: 'account',
        component: Account,
        beforeEnter: employeeGuard
    },
    {
        path: '*',
        name: 'NotFound',
        component: NotFound
    }
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
