import _ from 'lodash'
export default {
  computed: {
    news () {
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
      return this.getContentsByType(currentRoute.contentType, true)
    },
    categories () {
      let foundCategories = {}
      this.news.forEach(news => {
        if (_.isEmpty(foundCategories)) {
          foundCategories = _.countBy(news.category.options, function (option) {
            return option
          })
        } else {
          let currNewsCat =  _.countBy(news.category.options, function (option) {
            return option
          })
          // comparing current categories with the new posts categories and makes chages accordingly
          Object.keys(foundCategories).forEach(keyCat => {
            Object.keys(currNewsCat).forEach(keyCurCat => {
              if (keyCat === keyCurCat) {
                foundCategories[keyCat] = foundCategories[keyCat] + currNewsCat[keyCurCat]
              } else if (!(keyCurCat in foundCategories)) {
                foundCategories[keyCurCat] = currNewsCat[keyCurCat]
              }
            })
          })
        }
      })
      return foundCategories
    }
  }
}