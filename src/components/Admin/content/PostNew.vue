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
            <p>this field is for demo purposes only</p>
          </div>
        </div>

        <!-- tags -->
        <div class="field">
          <label class="label">Tags</label>
          <div class="control">
            <input type="text" class="input" v-model="tags">
            <p>Seperate tags with commas</p>
          </div>
        </div>
        <div class="field">
          <label class="label">Image</label>
          <div class="control">
            <img :src="featuredImage">
            <div class="file">
              <label class="file-label">
                <input @change="uploadImage" class="file-input" type="file" name="resume">
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
      tags: [],
      featuredImage: '',
      editorOptions
    }
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
    uploadImage (e) {
      console.log(e)
      let file = e.target.files[0];
      let storageRef = firebase.storage().ref('images/' + file.name);

      storageRef.put(file).then((function (snapshot) {
        this.featuredImage = snapshot.downloadURL;
      }).bind(this));
    }
  }
}

</script>
