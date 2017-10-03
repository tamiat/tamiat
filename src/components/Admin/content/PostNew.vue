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
import VueQuillEditor from 'vue-quill-editor';
import editorOptions from './editor-options';
import imageLoader from '../../../mixins/image-loader';
import notifier from '../../../mixins/notifier';

export default {
  data() {
    return {
      title: '',
      body: '',
      author: '',
      tags: '',
      editorOptions
    }
  },
  props: ['add-post'],
  mixins: [imageLoader, notifier],
  methods: {
    add() {
      if (this.title) {
        this.addPost({
          title: this.title,
          body: this.body,
          author: this.author,
          tags: this.tags,
          created: Date.now()
        })
      } else {
        this.showNotification('warning', 'The title field can not be empty');
      }

    }
  }
}

</script>
