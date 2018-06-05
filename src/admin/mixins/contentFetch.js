export default {
  methods: {
    selectContentByTypeAndId (type, id, onlyPublished) {
      let contentsByType = this.getContentsByType(type, onlyPublished)
      return contentsByType.filter(content => (onlyPublished ? content.state === 'published' : true) &&
              (content.slug ? content.slug : content['.key'] === id || {}))
    },
    getContentsByType (contentType, onlyPublished) {
      let selectedContentsData = []
      let selectedContents = this.contents.filter(content => {
        return content.name === contentType
      })
      selectedContents.forEach(content => {
        let contentDataArray = this.convertContentDataToArray(content.data)
        // Get Published Only
        if (onlyPublished === true) {
          contentDataArray = contentDataArray.filter(content => content.state === 'published')
        }
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
