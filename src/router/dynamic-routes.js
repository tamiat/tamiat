import { templatesRef } from '../admin/firebase_config/index'

let dynamicRoutes = {
  routes: [],
  getRoutes () {
    return new Promise((resolve, reject) => {
      templatesRef.on('value', (snapshot) => {
        let routesObj = snapshot.val()
        let routesArr = []
        for (let key in routesObj) {
          routesArr.push(routesObj[key])
        }
        resolve(routesArr)
      })
    })
  },

  addDynamicComponents () {
    this.routes.forEach(route => {
      const template = route.component
      route.component = () => { return import(`@/app/templates/${template}.vue`) }
    })
  },

  async addDynamicRoutesTo (router) {
    let loadedRoutes = await this.getRoutes()
    this.routes = [].concat(loadedRoutes)
    this.addDynamicComponents()
    router.addRoutes(this.routes)
  }
}

export default dynamicRoutes
