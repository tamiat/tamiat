import { contentsRef, routesRef } from '@/admin/firebase_config/index'
import contentFetch from '@/admin/mixins/contentFetch'
export default {
  mixins: [contentFetch],
  firebase: {
    routes: routesRef,
    contents: contentsRef
  },
  computed: {
    content () {
      let currentRoute = this.routes.filter((route) => {
        return route.path === this.$route.path
      })[0]
      let contentType = currentRoute.contentType
      let contentId = currentRoute.content || 'none'
      return this.selectContentByTypeAndId(contentType, contentId)
    }
  }
}
