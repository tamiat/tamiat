<template>
  <div class="container posts" id="posts">

    <!-- posts page title -->
    <div class="content-heading is-flex">
      <h3 class="is-size-3">Posts</h3>
      <router-link to="/admin/posts/new" class="button is-info">Add New</router-link>
    </div>

    <!-- notification -->
    <div v-if="notification.message" :class="'notification is-' + notification.type">
      <button class="delete" @click="hideNotifications"></button>{{notification.message}}
    </div>

    <!-- the new post form loaded via vue router -->
    <router-view :add-post="addPost" :update-post="updatePost" :posts="posts" :key="$route.name + ($route.params.key || '')"></router-view>

    <!-- posts list -->
    <div class="box">
      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Created</th>
            <th>tags</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(post, index) in posts" :key="index">
            <td class="post-title-cell">
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

            <td class="post-author-cell">{{post.author}}</td>
            <td class="post-tags-cell">{{postDate(post.created)}}</td>
            <td class="post-tags-cell">{{post.tags}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

import { postsRef } from '../../config';
import notifier from '../../mixins/notifier';

export default {
  firebase: {
    posts: postsRef
  },
  mixins: [notifier],
  methods: {
    addPost(post) {
      this.$firebaseRefs.posts.push(post).then(() => {
        this.showNotification('success', 'Post added successfully');
      })
    },
    deletePost(post) {
      // delete post form firebase
      if (confirm("Do you really want to delete this post ?")) {
        this.$firebaseRefs.posts.child(post['.key']).remove().then(() => {
          this.showNotification('success', 'Post deleted successfully');
        })
      }
    },
    updatePost(post) {
      // create a copy of the item
      let tempPost = { ...post };
      // remove the .key attribute
      delete tempPost['.key'];
      this.$firebaseRefs.posts.child(post['.key']).set(tempPost).then(() => {
        this.showNotification('success', 'Post updated successfully');
      });
    },
    postDate(epoch) {
      if (!epoch) return // if no time return nothing
      return moment(epoch).format('MM/DD/YY | hh:mm');
    }
  }
}

</script>

<style lang="scss">
#posts {
  .post-title-cell {
    width: 50%;
  }
  .post-author-cell {
    width: 25%;
  }
  .post-tags-cell {
    width: 25%;
  }
}
</style>
