// import app pages
import Home from '../components/home/Home';
import Admin from '../components/admin/Admin';
import Login from '../components/admin/Login';

// import admin page components
import Posts from '../components/admin/posts/Posts';
import PostNew from '../components/admin/posts/PostNew';
import PostEdit from '../components/admin/posts/PostEdit';
import Settings from '../components/Admin/content/Settings';
import Pages from '../components/Admin/content/Pages';
import Media from '../components/Admin/content/Media';

export default [
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
      }
    ]
  },
  {
    path: '*',
    name: 'default',
    component: Home
  }
]
