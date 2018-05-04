import { contentsRef, routesRef } from '@/admin/firebase_config/index'
export default {
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
    },
    selectContentByTypeAndId (type, id) {
      let contentsByType = this.getContentsByType(type)
      return contentsByType.filter(content => content['.key'] === id)[0] || {}
    },
    getContentsByType (contentType) {
      let selectedContentsData = []
      let selectedContents = this.contents.filter(content => {
        return content.name === contentType
      })
      selectedContents.forEach(content => {
        let contentDataArray = this.convertContentDataToArray(content.data)
        selectedContentsData = selectedContentsData.concat(contentDataArray || [])
      })
      return selectedContentsData
    },
    convertContentDataToArray (contentData) {
      let contentDataArray = []
      for (let key in contentData) {
        contentDataArray.push({
          ...contentData[key],
          '.key': key
        })
      }
      return contentDataArray
    }
  }
}
