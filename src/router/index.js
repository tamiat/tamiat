import Vue from 'vue'
import Router from 'vue-router'

// import app pages
import Home from '../components/Home'
import Admin from '../components/Admin'
import Login from '../components/Admin/Login'

// import admin page components
import Posts from '../components/Admin/content/Posts'
import PostNew from '../components/Admin/content/PostNew'
import PostEdit from '../components/Admin/content/PostEdit'
import Settings from '../components/Admin/content/Settings'
import Pages from '../components/Admin/content/Pages'
import Media from '../components/Admin/content/Media'
import Database from '../components/Admin/content/Database'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
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
            },
            {
              path: 'edit/:key',
              component: PostEdit
            }
          ]
        },
        {
          path: 'settings',
          component: Settings
        },
        {
          path: 'pages',
          component: Pages
        },
        {
          path: 'media',
          component: Media
        },
        {
          path: 'database',
          component: Database
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
