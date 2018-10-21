const postFilters = {
  data () {
    return {
      sortOptions: {
        title: {
          reverse: true
        },
        author: {
          reverse: true
        },
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
      searchPost: '',
      selectedState: 'all',
      params: {
        category: {
          id: 'all',
          label: 'All Categories'
        },
        bulkAction: {
          id: '',
          label: 'Bulk Actions'
        }
      }
    }
  },
  computed: {
    filteredPosts () {
      return this.posts
        .filter(post => {
          return post.title
            .toLowerCase()
            .includes(this.searchPost.toLowerCase())
        })
        .filter(() => {
          switch (this.selectedOption) {
            case 'title':
              return this.sortOptions.title.reverse
                ? this.posts.sort(this.sortAcs)
                : this.posts.sort(this.sortAcs).reverse()
            case 'author':
              return this.sortOptions.author.reverse
                ? this.posts.sort(this.sortAcs)
                : this.posts.sort(this.sortAcs).reverse()
            case 'created':
              return this.sortOptions.created.reverse
                ? this.posts.sort(this.sortAcs)
                : this.posts.sort(this.sortAcs).reverse()
            default:
              return this.posts
          }
        })
        .filter(post => {
          switch (this.params.category.id) {
            case 'all':
              return true
            default:
              return post.category === this.params.category.label
          }
        })
        .filter(post => {
          switch (this.selectedState) {
            case 'all':
              return true
            case 'saved':
              return post.state === 'saved'
            case 'published':
              return post.state === 'published'
          }
        })
    },
    postsList () {
      let list
      list = this.posts.map(post => {
        if (post.hasOwnProperty('category')) {
          if (post.category !== '') {
            return {
              id: post.category,
              label: post.category
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
    selectedPosts () {
      return this.filteredPosts.filter(post => {
        if (post.selected) {
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
        case 'title':
          this.selectedOption = 'title'
          this.sortOptions.title.reverse = !this.sortOptions.title.reverse
          break
        case 'author':
          this.selectedOption = 'author'
          this.sortOptions.author.reverse = !this.sortOptions.author.reverse
          break
        case 'created':
          this.selectedOption = 'created'
          this.sortOptions.created.reverse = !this.sortOptions.created.reverse
          break
      }
    },
    selectBulkActions () {
      var i = this.filteredPosts.length
      while (i--) {
        if (this.params.bulkAction.id === 'all') {
          this.filteredPosts[i].selected = true
        }
        if (this.params.bulkAction.id === 'none') {
          this.filteredPosts[i].selected = false
        }
        if (this.params.bulkAction.id === 'delete') {
          if (this.filteredPosts[i].selected === true) {
            this.$firebaseRefs.posts
              .child(this.filteredPosts[i]['.key'])
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
export default postFilters
