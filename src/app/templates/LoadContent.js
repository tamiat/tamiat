import { contentsRef, routesRef } from '@/admin/firebase_config/index'
import contentFetch from '@/admin/mixins/contentFetch'
export default {
  mixins: [contentFetch],
  data () {
    return {
      content: ''
    }
  },
  firebase: {
    routes: routesRef,
    contents: contentsRef
  },
  methods: {
    onLoaded () {
      let filteredRoutes = this.routes.filter((route) => {
        return route.path === this.$route.path
      })
      let contentType = filteredRoutes[0].contentType
      let contentId = filteredRoutes[0].content || 'none'
      this.content = this.selectContentByTypeAndId(contentType, contentId)
    }
  }
}
