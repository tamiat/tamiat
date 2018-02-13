<template>
  <div class="box">

    <h3>Edit post</h3>
    <div class="columns">

      <div class="column is-two-thirds">

        <!-- edit post title -->
        <div class="field">
          <label class="label">Post's title</label>
          <div class="control">
            <input type="text" class="input" v-model="post.title">
          </div>
        </div>

        <!-- rich text vue-quill-editor plugin -->
        <quill-editor v-model="post.body" :options="editorOptions">
        </quill-editor>
        <input type="file" id="getImage" style="display: none;" @change="uploadImage">

      </div>

      <!-- post right sidebar -->
      <div class="column is-one-third">

        <!-- edit author -->
        <div class="field">
          <label class="label">Author</label>
          <div class="control">
            <input type="text" class="input" maxlength="25" v-model="post.author">
            <p>this field is for demo purposes only</p>
          </div>
        </div>

        <!-- edit tags -->
        <div class="field">
          <label class="label">Tags</label>
          <div class="control">
            <input type="text" class="input" maxlength="25" v-model="tagString">
            <p>Seperate tags with commas</p>
          </div>
        </div>
        <div class="field">
          <label class="label">Image</label>
          <div class="control">
            <img :src="post.img">
            <div class="file">
              <label class="file-label">
                <input @change="uploadFeaturedImage" class="file-input" type="file" name="resume">
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fa fa-upload"></i>
                  </span>
                  <span class="file-label">
                    Choose a file…
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- warning notification -->
    <div v-if="notification.message" :class="'notification is-' + notification.type">
      <button class="delete" @click="hideNotifications"></button>{{notification.message}}
    </div>

    <!-- the form buttons -->
    <button type="submit" class="button is-info" @click="update">Update</button>
    <router-link to="/admin/posts" class="button is-danger">Cancel</router-link>
  </div>
</template>

<script>
import firebase from 'firebase'

import { mediaRef } from '../../../config'
import editorOptions from './editor-options'
import imageLoader from '../../../mixins/image-loader'
import notifier from '../../../mixins/notifier'

export default {
  name: 'post-edit',
  data () {
    return {
      /* Here we are filtering out the post containing the provided key in the router params
       * we are using Object.assign to copy the post by value not by reference
       * to prevent updating the poste when typing */
      post: Object.assign(
        {},
        (this.posts.filter((post) => {
          return (post['.key'] === this.$route.params.key)
        }))[0]
      ),
      editorOptions
    }
  },
  firebase: {
    media: mediaRef
  },
  props: ['posts', 'update-post'],
  mixins: [imageLoader, notifier],
  methods: {
    // call the updatePost method passed through props
    update () {
      if (this.post.title) {
        this.updatePost(this.post)
      } else {
        this.showNotification('warning', 'The title field can not be empty')
      }
    },
    uploadFeaturedImage (e) {
      let file = e.target.files[0]
      let storageRef = firebase.storage().ref('images/' + file.name)

      storageRef.put(file).then((snapshot) => {
        this.post.img = snapshot.downloadURL
        if (Object.values(this.media).find(e => e.path === snapshot.ref.fullPath)) return // this prevents duplicate entries in the media object
        this.$firebaseRefs.media.push({
          src: snapshot.downloadURL,
          path: snapshot.ref.fullPath,
          name: snapshot.metadata.name
        })
      })
    }
  },
  computed: {
    tagString: {
      get: function () {
        return this.post.tags && this.post.tags.join(',') // if no tags present join is undefined
      },
      set: function (newValue) {
        this.post.tags = newValue.split(',')
      }
    }
  }
}

</script>
