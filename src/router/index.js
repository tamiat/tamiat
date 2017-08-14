import Vue from 'vue';
import Router from 'vue-router';

// import app pages 
import Home from '../Home';
import Admin from '../Admin';
import Login from '../components/Login';
import Signup from '../components/Signup';

// import admin page components
import Posts from '../components/content/Posts';
import PostNew from '../components/content/PostNew';
import PostEdit from '../components/content/PostEdit';
import Users from '../components/content/Users';
import UserNew from '../components/content/UserNew';
import Settings from '../components/content/Settings';

Vue.use(Router);

export default new Router({
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
      path: '/signup',
      name: 'Signup',
      component: Signup
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
});
