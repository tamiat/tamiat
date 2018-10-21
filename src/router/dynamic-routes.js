import { routesRef } from '@/admin/firebase_config/index'

let dynamicRoutes = {
  routes: [],
  getRoutes () {
    return new Promise((resolve, reject) => {
      routesRef.on('value', snapshot => {
        let routesObj = snapshot.val()
        let routesArr = []
        for (let key in routesObj) {
          routesArr.push({
            path: routesObj[key]['path'],
            component: routesObj[key]['template']
          })
        }
        resolve([...routesArr])
      })
    })
  },

  addDynamicComponents () {
    this.routes.forEach(route => {
      const template = route.component
      route.component = () => {
        return import(`@/app/templates/${template}.vue`)
      }
    })
  },

  async addDynamicRoutesTo (router) {
    let loadedRoutes = await this.getRoutes()
    this.routes = [...loadedRoutes]
    this.addDynamicComponents()
    router.addRoutes(this.routes)
  }
}

export default dynamicRoutes
