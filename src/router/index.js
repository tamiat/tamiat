import Vue from 'vue'
import Router from 'vue-router'

import Home from '../Home'
import Admin from '../Admin'

import Posts from '../components/Posts'
import PostNew from '../components/PostNew'
import Users from '../components/Users'
import UserNew from '../components/UserNew'
import Settings from '../components/Settings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children: [
        {
          path: 'posts',
          component: Posts,
          children: [
            {
              path: 'new',
              component: PostNew
            }
          ]
        },
        {
          path: 'users',
          component: Users,
          children: [
            {
              path: 'new',
              component: UserNew
            }
          ]
        },
        {
          path: 'settings',
          component: Settings
        }
      ]
    },
    {
      path: '*',
      name: 'default',
      component: Home
    }
  ]
})
