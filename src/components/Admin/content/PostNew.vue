<template>
  <div class="box">

    <div class="columns">

      <div class="column is-two-thirds">

        <!-- the new post title -->
        <div class="field">
          <label class="label">Post's title</label>
          <div class="control">
            <input type="text" class="input" placeholder="Title" v-model="title">
          </div>
        </div>

        <!-- rich text vue-quill-editor plugin -->
        <quill-editor v-model="body" :options="editorOptions">
        </quill-editor>
        <input type="file" id="getImage" style="display: none;" @change="uploadImage">

        <!-- Category field -->
        <br>
        <div class="field">
          <label class="label">Category</label>
          <div class="control">
            <input type="text" class="input" placeholder="Category" v-model="category" maxlength="25">
          </div>
        </div>

      </div>

      <!-- new post right sidebar -->
      <div class="column is-one-third">

        <!-- author -->
        <div class="field">
          <label class="label">Author</label>
          <div class="control">
            <input type="text" class="input" placeholder="Author" v-model="author" maxlength="25" required>
            <p>this field is for demo purposes only</p>
          </div>
        </div>

        <!-- tags -->
        <div class="field">
          <label class="label">Tags</label>
          <div class="control">
            <div class="tags tagscontainer">
            <span @click="removeTag(index)" v-for="(tag, index) in tags" :key="index" class="tag is-info pointer">{{tag}}</span>
            <input placeholder="Tags" v-on:keyup.enter="styleTags" type="text" class="input" maxlength="25" v-model="inputData">
            </div>
            <p>Seperate tags with commas</p>
          </div>
        </div>
        <div class="field">
          <label class="label">Featured image</label>
          <div class="control">
            <img :src="featuredImage">
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

    <!-- notification -->
    <div v-if="notification.message" :class="'notification is-' + notification.type">
      <button class="delete" @click="hideNotifications"></button>{{notification.message}}
    </div>

    <!-- the form buttons -->
    <button type="submit" class="button is-success" @click="add('published')">Publish</button>
    <button type="submit" class="button is-info" @click="add('saved')">Save Draft</button>
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
  name: 'post-new',
  data () {
    return {
      title: '',
      body: '',
      author: '',
      tags: [],
      inputData: '',
      featuredImage: '',
      category: '',
      editorOptions
    }
  },
  firebase: {
    media: mediaRef
  },
  props: ['add-post'],
  mixins: [imageLoader, notifier],
  methods: {
    add (state) {
      console.log(this.featuredImage)
      if (this.title) {
        this.addPost({
          title: this.title,
          body: this.body,
          author: this.author,
          tags: this.tags,
          img: this.featuredImage,
          category: this.category,
          created: Date.now(),
          selected: false,
          state: state
        })
        this.$router.push({ path: '/admin/posts' })
      } else {
        this.showNotification('warning', 'The title field can not be empty')
      }
    },
    uploadFeaturedImage (e) {
      console.log(e)
      let file = e.target.files[0]
      let storageRef = firebase.storage().ref('images/' + file.name)

      storageRef.put(file).then((snapshot) => {
        console.log(snapshot)
        this.featuredImage = snapshot.downloadURL
        if (Object.values(this.media).find(e => e.path === snapshot.ref.fullPath)) return // this prevents duplicate entries in the media object
        this.$firebaseRefs.media.push({
          src: snapshot.downloadURL,
          path: snapshot.ref.fullPath,
          name: snapshot.metadata.name
        })
      })
    },
    styleTags () {
            if(this.inputData !== ""){
            this.tags.push(`${this.inputData} ×`);
            this.inputData = '';
            }
    },
    removeTag (index) {
            this.tags.splice(index, 1);
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

