<template>
  <div class="box">

    <h3>Add new post</h3>
    <div class="columns">

      <div class="column is-two-thirds">

        <!-- the new post title -->
        <div class="field">
          <label class="label">Post's title</label>
          <div class="control">
            <input type="text" class="input" v-model="title">
          </div>
        </div>

        <!-- rich text vue-quill-editor plugin -->
        <quill-editor v-model="body" :options="editorOptions">
        </quill-editor>
        <input type="file" id="getImage" style="display: none;" @change="uploadImage">

      </div>

      <!-- new post right sidebar -->
      <div class="column is-one-third">

        <!-- author -->
        <div class="field">
          <label class="label">Author</label>
          <div class="control">
            <input type="text" class="input" v-model="author" required>
            <p>This field is for demo purposes only</p>
          </div>
        </div>

        <!-- tags -->
        <div class="field">
          <label class="label">Tags</label>
          <div class="control">
            <input type="text" class="input" v-model="tags">
            <p>Separate tags with commas</p>
          </div>
        </div>
        <div class="field">
          <label class="label">Image</label>
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
    <button type="submit" class="button is-info" @click="add">Add</button>
    <router-link to="/admin/posts" class="button is-danger">Cancel</router-link>
  </div>
</template>

<script>
import firebase from 'firebase'

import { mediaRef } from '../../../config';
import VueQuillEditor from 'vue-quill-editor';
import editorOptions from './editor-options';
import imageLoader from '../../../mixins/image-loader';
import notifier from '../../../mixins/notifier';

export default {
  name: 'post-new',
  data() {
    return {
      title: '',
      body: '',
      author: '',
      tags: '',
      featuredImage: '',
      editorOptions
    }
  },
  firebase: {
    media: mediaRef
  },
  props: ['add-post'],
  mixins: [imageLoader, notifier],
  methods: {
    add() {
      console.log(this.featuredImage)
      if (this.title) {
        this.addPost({
          title: this.title,
          body: this.body,
          author: this.author,
          tags: this.tags.split(','),
          img: this.featuredImage,
          created: Date.now()
        })
      } else {
        this.showNotification('warning', 'The title field can not be empty');
      }

    },
    uploadFeaturedImage (e) {
      console.log(e)
      let file = e.target.files[0];
      let storageRef = firebase.storage().ref('images/' + file.name);

      storageRef.put(file).then((function (snapshot) {
        console.log(snapshot)
        this.featuredImage = snapshot.downloadURL;
        if (Object.values(this.media).find(e => e.path === snapshot.ref.fullPath)) return // this prevents duplicate entries in the media object
        this.$firebaseRefs.media.push({
          src: snapshot.downloadURL,
          path: snapshot.ref.fullPath,
          name: snapshot.metadata.name
        })
      }).bind(this));
    }
  }
}

</script>
