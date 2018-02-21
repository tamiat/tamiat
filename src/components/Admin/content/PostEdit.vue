<template>
  <div class="box">

    <div class="columns">

      <div class="column is-two-thirds">

        <!-- edit post title -->
        <div class="field">
          <label class="label">Post's title</label>
          <div class="control">
            <input type="text" class="input" placeholder="Title" v-model="post.title">
          </div>
        </div>

        <!-- rich text vue-quill-editor plugin -->
        <quill-editor v-model="post.body" :options="editorOptions">
        </quill-editor>
        <input type="file" id="getImage" style="display: none;" @change="uploadImage">

        <!-- Category field -->
        <br>
        <div class="field">
          <label class="label">Category</label>
          <div class="control">
            <input type="text" class="input" placeholder="Category" v-model="post.category" maxlength="25">
          </div>
        </div>

      </div>

      <!-- post right sidebar -->
      <div class="column is-one-third">

        <!-- edit author -->
        <div class="field">
          <label class="label">Author</label>
          <div class="control">
            <input type="text" class="input"  placeholder="Author" maxlength="25" v-model="post.author">
            <p>this field is for demo purposes only</p>
          </div>
        </div>

        <!-- edit tags -->
        <div class="field">
          <label class="label">Tags</label>
          <div class="control">
            <div class="tags tagscontainer">
            <span @click="removeTag(index)" v-for="(tag, index) in tagString" :key="index" class="tag is-info pointer">{{tag}}<button class="delete is-small"></button></span>
            <input placeholder="Tags" @keypress.44.prevent="styleTags" @keyup.enter="styleTags" type="text" class="input" maxlength="25" v-model="inputData">
            </div>
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
    <button v-if="post.state === 'saved'" type="submit" class="button is-success" @click="update(true)">Update and publish</button>
    <button type="submit" class="button is-info" @click="update(false)">Update</button>
    <router-link to="/admin/posts" class="button is-danger">Cancel</router-link>
  </div>
</template>

<script>
import firebase from 'firebase'

import { mediaRef } from '@/firebase_config'
import editorOptions from './editor-options'
import imageLoader from '@/mixins/image-loader'
import notifier from '@/mixins/notifier'

export default {
  name: 'post-edit',
  data () {
    return {
      /* Here we are filtering out the post containing the provided key in the router params
       * we are using Object.assign to copy the post by value not by reference
       * to prevent updating the poste when typing */
      inputData: '',
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
    update (publish) {
      if (this.post.title) {
        if (publish) {
          this.post.state = 'published'
        }
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
    },
    styleTags () {
      if (this.inputData !== '') {
        this.tagString.push(`${this.inputData.trim()}`)
        this.inputData = ''
      }
    },
    removeTag (index) {
      this.tagString.splice(index, 1)
    }
  },
  computed: {
    tagString: {
      get: function () {
        return this.post.tags // if no tags present join is undefined
      },
      set: function (newValue) {
        this.post.tags = newValue
      }
    }
  }
}

</script>
<style>
.tagscontainer {
  border: 2px solid #f2f2f2;
  border-radius: 5px;
  padding: 5px;
}
.pointer {
  cursor: pointer;
}

</style>
