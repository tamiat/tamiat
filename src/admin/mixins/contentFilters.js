const contentFilters = {
  data () {
    return {
      sortOptions: {
        created: {
          reverse: true
        }
      },
      bulkActions: [
        {
          id: 'all',
          label: 'Select all'
        },
        {
          id: 'none',
          label: 'Select none'
        },
        {
          id: 'delete',
          label: 'Bulk delete'
        }
      ],
      selectedOption: '',
      searchContent: '',
      selectedState: 'all',
      params: {
        bulkAction: {
          id: '',
          label: 'Bulk Actions'
        }
      }
    }
  },
  computed: {
    filteredContent () {
      return this.contentData
        .filter(() => {
          switch (this.selectedOption) {
            case 'created':
              return this.sortOptions.created.reverse
                ? this.contentData.sort(this.sortAcs)
                : this.contentData.sort(this.sortAcs).reverse()
            default:
              return this.contentData
          }
        })
        .filter(content => {
          switch (this.selectedState) {
            case 'all':
              return true
            case 'saved':
              return content.state === 'saved'
            case 'published':
              return content.state === 'published'
          }
        })
    },
    contentList () {
      let list
      list = this.contentData.map(content => {
        if (content.hasOwnProperty('category')) {
          if (content.category !== '') {
            return {
              id: content.category,
              label: content.category
            }
          }
        }
      })
      list.push({
        id: 'all',
        label: 'All Categories'
      })
      return list
    },
    selectedContent () {
      return this.filteredContent.filter(content => {
        if (content.selected) {
          return true
        }
      })
    }
  },
  methods: {
    sortAcs (a, b) {
      if (this.selectedOption === 'created') {
        if (a[this.selectedOption] < b[this.selectedOption]) {
          return -1
        }
        if (a[this.selectedOption] > b[this.selectedOption]) {
          return 1
        }
      } else {
        if (
          a[this.selectedOption].toLowerCase() <
          b[this.selectedOption].toLowerCase()
        ) {
          return -1
        }
        if (
          a[this.selectedOption].toLowerCase() >
          b[this.selectedOption].toLowerCase()
        ) {
          return 1
        }
      }
      return 0
    },
    sortBy (option) {
      switch (option) {
        case 'created':
          this.selectedOption = 'created'
          this.sortOptions.created.reverse = !this.sortOptions.created.reverse
          break
      }
    },
    selectBulkActions () {
      var i = this.filteredContent.length
      while (i--) {
        if (this.params.bulkAction.id === 'all') {
          this.filteredContent[i].selected = true
        }
        if (this.params.bulkAction.id === 'none') {
          this.filteredContent[i].selected = false
        }
        if (this.params.bulkAction.id === 'delete') {
          if (this.filteredContent[i].selected === true) {
            this.$firebaseRefs.contents
              .child(this.$route.params.key + '/data')
              .child(this.filteredContent[i]['.key'])
              .remove()
              .then(() => {
                // this.showNotification('success', 'Posts deleted successfully')
                // this.showModal = false
              })
          }
        }
      }
      this.showModal = false
    }
  }
}
export default contentFilters
