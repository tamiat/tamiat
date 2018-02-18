<template>
  <div class="container posts" id="posts">

    <!-- posts page title -->
    <div class="content-heading is-flex">
      <h3 class="is-size-3">Posts</h3>
      <router-link to="/admin/posts/new" class="button is-info">Add New</router-link>
    </div>

    <!-- notification -->
    <transition mode="out-in" name="fade">
      <div v-if="notification.message" :class="'notification is-' + notification.type">
        <button class="delete" @click="hideNotifications"></button>{{notification.message}}
      </div>
    </transition>

     <!-- modal for post delete -->
    <transition mode="out-in" name="fade">
      <modal @close="showModal = false" :kind="kind" @confirmDeletePost='confirmDeletePost()' v-if="showModal" :header="header"/>
    </transition>

    <!-- the new post form loaded via vue router -->
      <router-view :add-post="addPost" :update-post="updatePost" :posts="posts" :key="$route.name + ($route.params.key || '')"></router-view>

    <!-- Search posts -->
    <div class="field is-grouped">
      <p class="control is-expanded">
        <input class="input" type="text" v-model="searchPost" placeholder="Find a post">
      </p>
      <p class="control">
        <a class="button is-info">
          Search
        </a>
      </p>
    </div>

    <!-- Filters -->

    <!-- States -->
    <div class="filters">
      <div class="states">
        <a class="state" @click="setState('all')" :class="{ 'activeState': selectedState === 'all' }">
          All<span class="stateCnt">({{ allPosts }})</span>
        </a>|
        <a class="state" @click="setState('published')" :class="{ 'activeState': selectedState === 'published' }">
          Published<span class="stateCnt">({{ publishedPosts.length}})</span>
        </a>|
        <a class="state" @click="setState('saved')" :class="{ 'activeState': selectedState === 'saved' }">
          Saved<span class="stateCnt">({{ savedPosts.length}})</span>
        </a>
      </div>
    <!-- Dropdown filters -->
      <div >
        <!-- Categories -->
        <dropdown :options="postsList" :selectedElement="params.category" />
        <!-- Bulk actions -->
        <dropdown :options="bulkActions" :selectedElement="params.bulkAction" @selectBulkActions="selectBulkActions()"/>
      </div>
    </div>

    <!-- posts list -->
    <div class="box">
      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th @click="sortBy('title')">
              Title
              <span class="icon">
                <i :class="{ 'fa fa-sort-down': !sortOptions.title.reverse, 'fa fa-sort-up': sortOptions.title.reverse }"></i>
              </span>
            </th>
            <th>
              Category
            </th>
            <th @click="sortBy('author')">
              Author
              <span class="icon">
                <i :class="{ 'fa fa-sort-down': !sortOptions.author.reverse, 'fa fa-sort-up': sortOptions.author.reverse }"></i>
              </span>
            </th>
            <th @click="sortBy('created')">
              Created
              <span class="icon">
                <i :class="{ 'fa fa-sort-down': !sortOptions.created.reverse, 'fa fa-sort-up': sortOptions.created.reverse }"></i>
              </span>
            </th>
            <th>tags</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(post, index) in filteredPosts" :key="index">
            <td class="post-title-cell">
              <checkbox v-model="post.selected" />
              <router-link :to="'/admin/posts/edit/' + post['.key']">
                {{post.title}}
              </router-link>

              <div class="actions">
                <router-link :to="'/admin/posts/edit/' + post['.key']">
                  <span class="has-text-info">Edit</span>
                </router-link>
                <span @click="deletePost(post)" class="has-text-danger">Delete</span>
              </div>
            </td>
            <td class="post-category-cell">{{post.category}}</td>
            <td class="post-author-cell">{{post.author}}</td>
            <td class="post-tags-cell">{{postDate(post.created)}}</td>
            <td class="post-tags-cell">
              <span v-if="post.tags">
                {{joined(post.tags)}}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { postsRef } from '../../../config'
import notifier from '../../../mixins/notifier'
import modal from '@/components/shared/Modal'
import postFilters from '@/mixins/postFilters'
import dropdown from '@/components/shared/Dropdown'
import checkbox from '@/components/shared/Checkbox'
export default {
  name: 'posts',
  data () {
    return {
      showModal: false,
      header: '',
      kind: '',
      post: '',
      sortKey: 'tittle'
    }
  },
  firebase: {
    posts: postsRef
  },
  computed: {
    allPosts () {
      return this.posts.length
    },
    savedPosts () {
      return this.posts
        .filter(post => {
          if (post.state === 'saved') {
            return true
          }
        })
    },
    publishedPosts () {
      return this.posts
        .filter(post => {
          if (post.state === 'published') {
            return true
          }
        })
    }
  },
  mixins: [notifier, postFilters],
  methods: {
    addPost (post) {
      this.$firebaseRefs.posts.push(post).then(() => {
        this.showNotification('success', 'Post added successfully')
      })
    },
    deletePost (post) {
      // delete post form firebase
      this.header = 'Are you sure you want to delete this post?'
      this.kind = 'deletePost'
      this.showModal = true
      this.post = post
    },
    confirmDeletePost () {
      this.$firebaseRefs.posts.child(this.post['.key']).remove().then(() => {
        this.showNotification('success', 'Post deleted successfully')
        this.showModal = false
        this.post = ''
      })
    },
    updatePost (post) {
      console.log(JSON.stringify(post), post)
      // create a copy of the item
      let tempPost = { ...post }
      // remove the .key attribute
      delete tempPost['.key']
      this.$firebaseRefs.posts.child(post['.key']).set(tempPost).then(() => {
        if (post.state === 'saved') {
          this.showNotification('success', 'Post updated successfully')
        }
        if (post.state === 'published') {
          this.showNotification('success', 'Post updated and published successfully')
        }
      })
    },
    postDate (epoch) {
      if (!epoch) return // if no time return nothing
      return moment(epoch).format('MM/DD/YY | hh:mm')
    },
    joined (t) {
      return Object.values(t).join(', ')
    },
    setState (s) {
      this.selectedState = s
    }
  },
  components: {
    modal,
    dropdown,
    checkbox
  }
}

</script>

<style lang="scss">
#posts {
  .post-title-cell {
    width: 40%;
  }
  .post-category-cell {
    width: 20%;
  }
  .post-author-cell {
    width: 20%;
  }
  .post-tags-cell {
    width: 20%;
  }
}
th {
  cursor: pointer
}
.icon-centered {
    display: block !important;
    width: 100% !important;
    text-align: center !important;
}
.filters {
  padding-bottom: 5px;
  padding-top: 15px;
}
.states {
  padding-bottom: 5px;
  padding-left: 5px;
}
.stateCnt {
  color: rgb(122, 121, 121);
  font-size: 14px;
  padding-left: 3px;
}
.state {
  padding-left: 4px;
  padding-right: 5px;
}
.activeState {
  color: rgb(0, 0, 0) !important;
}
</style>
