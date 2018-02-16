const postFilters = {
  data () {
    return {
      sortOptions:
        {
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
      bulkActions:
      [
        {
          id: 'all',
          label: 'Select all'
        },
        {
          id: 'none',
          label: 'Select none'
        }
      ],
      selectedOption: '',
      searchPost: '',
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
          return post.title.toLowerCase().includes(this.searchPost.toLowerCase())
        })
        .filter(() => {
          switch (this.selectedOption) {
            case 'title':
              return this.sortOptions.title.reverse ? this.posts.sort(this.sortAcs) : this.posts.sort(this.sortAcs).reverse()
            case 'author':
              return this.sortOptions.author.reverse ? this.posts.sort(this.sortAcs) : this.posts.sort(this.sortAcs).reverse()
            case 'created':
              return this.sortOptions.created.reverse ? this.posts.sort(this.sortAcs) : this.posts.sort(this.sortAcs).reverse()
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
    },
    postsList () {
      let list
      list = this.posts.map(post => {
        if (post.hasOwnProperty('category')) {
          return {
            id: post.category,
            label: post.category
          }
        }
      })
      list.push({
        id: 'all',
        label: 'All Categories'
      })
      return list
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
        if (a[this.selectedOption].toLowerCase() < b[this.selectedOption].toLowerCase()) {
          return -1
        }
        if (a[this.selectedOption].toLowerCase() > b[this.selectedOption].toLowerCase()) {
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
      for (var key in this.filteredPosts) {
        if (this.params.bulkAction.id === 'all') {
          this.filteredPosts[key].selected = true
        } else {
          this.filteredPosts[key].selected = false
        }
      }
    }
  }
}
export default postFilters
