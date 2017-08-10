import Vue from 'vue';
import Router from 'vue-router';

// import app pages 
import Home from '../Home';
import Admin from '../Admin';

// import admin page components
import Posts from '../components/content/Posts';
import PostNew from '../components/content/PostNew';
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
});
