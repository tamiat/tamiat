<template>
<div>
  <v-toolbar class="blue darken-1 mb-1">
    <v-toolbar-title class="white--text">Posts</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn class="white blue--text" @click="$refs.newPost.open()">Add post</v-btn>
  </v-toolbar>
  <!-- notification -->
  <div v-if="notification.message" :class="'notification is-' + notification.type">
    <button class="delete" @click="hideNotifications"></button>{{notification.message}}
  </div>

  <v-layout row>
    <post-new ref="newPost"></post-new>
    <v-flex xs12 sm6 class="pa-3">
      <v-card v-for="(post, index) in posts" :key="index">
        <v-card-media :src="post.img" height="200px"></v-card-media>
        <v-card-title primary-title>
          <div>
            <div class="headline">
              {{ post.title }}
            </div>
            <span class="grey--text">1,000 miles of wonder</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat router :to="{ name: 'PostEdit', params: { key: post['.key'] } }">
            Edit
          </v-btn>
          <v-btn @click="deletePost(post)" flat color="purple">Delete</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="show">
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
import moment from 'moment'
import notifier from '../../../mixins/notifier'
import { postsRef } from '../../../config'

import PostNew from './PostNew'

export default {
  components: { PostNew },
  data () {
    return {
      show: false,
      dialog: false
    }
  },
  firebase: {
    posts: postsRef
  },
  mixins: [notifier],
  methods: {
    deletePost(post) {
      // delete post form firebase
      if (confirm("Do you really want to delete this post ?")) {
        this.$firebaseRefs.posts.child(post['.key']).remove().then(() => {
          this.showNotification('success', 'Post deleted successfully');
        })
      }
    },
    updatePost(post) {
      console.log(JSON.stringify(post), post)
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
    },
    joined(t) {
      return Object.values(t).join(',')
    }
  }
}

</script>

<style lang="scss">
  .ql-container {
    height: 200px;
  }
</style>

<style lang="scss" scoped>
</style>
