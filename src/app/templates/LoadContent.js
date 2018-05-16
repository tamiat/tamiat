import { contentsRef, routesRef } from '@/admin/firebase_config/index'
import contentFetch from '@/admin/mixins/contentFetch'
import _ from 'lodash'

export default {
  mixins: [contentFetch],
  firebase: {
    routes: routesRef,
    contents: contentsRef
  },
  computed: {
    content () {
      const params = this.$route.params
      let path = this.$route.path
      if (params) {
        _.forIn(params, (value, key) => {
          path = path.replace(value, ':' + key)
        })
      }
      let currentRoute = this.routes.filter((route) => {
        return route.path === path
      })[0]

      let contentType = currentRoute.contentType
      let contentId = currentRoute.content !== 'none' && currentRoute.content !== undefined
        ? currentRoute.content : (_.has(params, 'id') ? params.id : 'none')

      return this.selectContentByTypeAndId(contentType, contentId)
    }
  }
}
