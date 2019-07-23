import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/pages/Homepage'
import Signin from '@/components/pages/Signin'
import Signup from '@/components/pages/Signup'
import Signout from '@/components/pages/Signout'
import Dashboard from '@/components/pages/Dashboard'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Homepage',
            component: Homepage
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup
        },
        {
            path: '/signin',
            name: 'Signin',
            component: Signin
        },
        {
            path: '/signout',
            name: 'Signout',
            component: Signout
        },
        {
            path: '/member',
            name: 'Dashboard',
            component: Dashboard
        },
        {
            path: '/member/:section',
            name: 'DashboardSection',
            component: Dashboard
        },
        {
            path: '/member/:section/:action',
            name: 'DashboardAction',
            component: Dashboard
        },
        {
            path: '/member/:section/:action/:id',
            name: 'DashboardTargetedAction',
            component: Dashboard
        }
    ]
})
