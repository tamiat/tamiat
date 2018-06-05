export default {
  methods: {
    selectContentByTypeAndId (type, id) {
      let contentsByType = this.getContentsByType(type)
      return contentsByType.filter(content => content.state !== 'saved' &&
              (content.slug ? content.slug : content[0]['.key'] === id || {}))
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
