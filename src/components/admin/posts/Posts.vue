<template>
<div>
  <v-toolbar class="blue darken-1">
    <v-toolbar-title class="white--text">Posts</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn class="white blue--text" @click="$refs.newPost.open()">Add post</v-btn>
  </v-toolbar>
  <v-progress-linear v-if="loader" color="orange lighten-2" class="mb-2 mt-0" v-bind:indeterminate="true"></v-progress-linear>
  <v-container grid-list-md class="pa-3">
    <v-layout row>
      <post-new ref="newPost"></post-new>
      <v-flex xs12 sm6 v-for="(post, key) in posts" :key="key" v-if="key !== '.key'">
        <v-card>
          <v-card-media :src="post.img" height="250px"></v-card-media>
          <v-card-title primary-title>
            <div>
              <p class="headline ma-0">
                {{ post.title }}
              </p>
              <span class="grey--text"></span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat>
              Edit
            </v-btn>
            <v-btn @click="deletePost(key)" flat color="red darken-1">Delete</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click.native="show = !show">
              <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-slide-y-transition>
            <v-card-text v-show="show" v-html="post.body"></v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
    </v-layout>
    <prompt-dialog ref="deleteDialog"></prompt-dialog>
    <v-snackbar :timeout="5000" bottom right v-model="snackbar">
      {{ snackMessage }}
      <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</div>
</template>

<script>
import moment from 'moment'
import { postsRef } from '../../../config'
import snack from '../../../mixins/snack'

import PostNew from './PostNew'
import PromptDialog from '../shared/PromptDialog'

export default {
  components: { PostNew, PromptDialog },
  data () {
    return {
      loader: true,
      show: false,
      dialog: false
    }
  },
  firebase: {
    posts: {
      source: postsRef,
      asObject: true,
      readyCallback: function () { this.loader = false }
    }
  },
  mixins: [ snack ],
  methods: {
    deletePost(key) {
      this.$refs.deleteDialog.ask('Delete this post?', 'This action cannot be restored.')
        .then(answer => {
          if (answer) {
            this.$firebaseRefs.posts.child(key).remove()
              .then(() => {
                this.snack('Post deleted.')
            })
          }
        })
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
