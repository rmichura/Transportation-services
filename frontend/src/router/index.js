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
import EmployeeAccount from "@/views/employee/EmployeeAccount";
import CustomerAccount from "@/views/user/CustomerAccount";
import AdminAccount from "@/views/admin/AdminAccount";
import CustomerOrder from "@/views/user/CustomerOrder";
import CustomerOrderState from "@/views/user/CustomerOrderState";
import CustomerOrderHistory from "@/views/user/CustomerOrderHistory";
import OrdersManagement from "@/views/admin/OrdersManagement";
import CarsManagement from "@/views/admin/CarsManagement";
import EmployeeOrder from "@/views/employee/EmployeeOrder";
import EmployeeOrderHistory from "@/views/employee/EmployeeOrderHistory";
import EmployeeOrderState from "@/views/employee/EmployeeOrderState";
import EmployeeUsersManagement from "@/views/employee/EmployeeUsersManagement";
import EmployeeOrdersManagement from "@/views/employee/EmployeeOrdersManagement";
import UsersAndEmployeesManagement from "@/views/admin/UsersAndEmployeesManagement";
import DriversManagement from "@/views/admin/DriversManagement.vue";
import EmployeeScheduler from "@/views/employee/EmployeeScheduler.vue";

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
        path: '/customer/order',
        name: 'CustomerOrder',
        component: CustomerOrder,
        beforeEnter: userGuard
    },
    {
        path: '/customer/order/state',
        name: 'CustomerOrderState',
        component: CustomerOrderState,
        beforeEnter: userGuard
    },
    {
        path: '/customer/order/history',
        name: 'CustomerOrderHistory',
        component: CustomerOrderHistory,
        beforeEnter: userGuard
    },
    {
        path: '/customer/account',
        name: 'CustomerAccount',
        component: CustomerAccount,
        beforeEnter: userGuard
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        beforeEnter: adminGuard
    },
    {
        path: '/admin/account',
        name: 'adminAccount',
        component: AdminAccount,
        beforeEnter: adminGuard
    },
    {
        path: '/admin/management/orders',
        name: 'AdminManagementOrders',
        component: OrdersManagement,
        beforeEnter: adminGuard
    },
    {
        path: '/admin/management/users',
        name: 'AdminManagementUsers',
        component: UsersAndEmployeesManagement,
        beforeEnter: adminGuard
    },
    {
        path: '/admin/management/drivers',
        name: 'AdminManagementDrivers',
        component: DriversManagement,
        beforeEnter: adminGuard
    },
    {
        path: '/admin/management/cars',
        name: 'AdminManagementCars',
        component: CarsManagement,
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
        name: 'EmployeeAccount',
        component: EmployeeAccount,
        beforeEnter: employeeGuard
    },
    {
        path: '/employee/order',
        name: 'EmployeeOrder',
        component: EmployeeOrder,
        beforeEnter: employeeGuard
    },
    {
        path: '/employee/order/history',
        name: 'EmployeeOrderHistory',
        component: EmployeeOrderHistory,
        beforeEnter: employeeGuard
    },
    {
        path: '/employee/order/state',
        name: 'EmployeeOrderState',
        component: EmployeeOrderState,
        beforeEnter: employeeGuard
    },
    {
        path: '/employee/management/orders',
        name: 'EmployeeManagementOrders',
        component: EmployeeOrdersManagement,
        beforeEnter: employeeGuard
    },
    {
        path: '/employee/management/users',
        name: 'EmployeeManagementUsers',
        component: EmployeeUsersManagement,
        beforeEnter: employeeGuard
    },
    {
        path: '/employee/scheduler',
        name: 'EmployeeScheduler',
        component: EmployeeScheduler,
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
