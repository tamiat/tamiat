import firebase from 'firebase'

// import app pages
import Home from '../components/home/Home'
import Admin from '../components/admin/Admin'
import Login from '../components/admin/login/Login'

// import admin page components
import Posts from '../components/admin/posts/Posts'
import PostEdit from '../components/admin/posts/PostEdit'
import Settings from '../components/admin/settings/Settings'
import Pages from '../components/admin/pages/Pages'
import Media from '../components/admin/media/Media'

export default [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/admin', name: 'Admin', component: Admin, redirect: { path: '/admin/posts' },
    children: [
      { path: 'posts', component: Posts, beforeEnter: checkAuth,
        children: [
          { path: 'edit/:key', name: 'PostEdit', component: PostEdit, beforeEnter: checkAuth }
        ]
      },
      { path: 'settings', component: Settings, beforeEnter: checkAuth },
      { path: 'pages', component: Pages, beforeEnter: checkAuth },
      { path: 'media', component: Media, beforeEnter: checkAuth }
    ]
  },
  { path: '*', name: 'default', component: Home }
]

function checkAuth(to, from, next) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      next()
    } else {
      next({ name: 'Login' })
    }
  })
}
