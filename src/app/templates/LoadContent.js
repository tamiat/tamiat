import { contentsRef, routesRef } from '@/admin/firebase_config/index'
export default {
  data () {
    return {
      content: ''
    }
  },
  firebase: {
    routes: routesRef
  },
  methods: {
    onLoaded () {
      let filteredRoutes = this.routes.filter((route) => {
        return route.path === this.$route.path
      })
      let contentId = filteredRoutes[0].content || 'none'
      this.getContentById(contentId)
    },
    getContentById (id) {
      if (id !== 'none') {
        contentsRef.child(id).on('value', (snapshot) => {
          this.content = snapshot.val() || ''
        })
      }
    }
  }
}
