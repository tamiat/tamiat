// import app pages
import Home from '@/app/pages/Home'

// import admin page components
import Admin from '@/admin/pages/Admin'
import Login from '@/admin/pages/Login'
import Settings from '@/admin/pages/settings/Settings'
import Routing from '@/admin/pages/Routing'
import Media from '@/admin/pages/Media'
import Database from '@/admin/pages/Database'
import ContentType from '@/admin/pages/content/content-type/ContentType'
import FieldNew from '@/admin/pages/content/fields/FieldNew'
import FieldEdit from '@/admin/pages/content/fields/FieldEdit'
import Contents from '@/admin/pages/content/contents/Contents'
import ContentsNew from '@/admin/pages/content/contents/ContentsNew'
import ContentsEdit from '@/admin/pages/content/contents/ContentsEdit'

const routes = [
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
        path: 'settings',
        component: Settings
      },
      {
        path: 'routing',
        component: Routing
      },
      {
        path: 'media',
        component: Media
      },
      {
        path: 'database',
        component: Database
      },
      {
        path: 'content',
        component: ContentType,
        children: [
          {
            path: 'fieldNew',
            component: FieldNew
          },
          {
            path: 'fieldEdit/:key',
            component: FieldEdit
          }
        ]
      },
      {
        path: 'content/:key',
        component: Contents,
        children: [
          {
            path: 'new',
            component: ContentsNew
          },
          {
            path: 'edit/:contentKey',
            component: ContentsEdit
          }
        ]
      }
    ]
  },
  {
    path: '*',
    name: 'default',
    component: Home
  }
]

export default routes
