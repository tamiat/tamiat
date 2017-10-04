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
            <input type="text" class="input" v-model="post.author">
            <p>this field is for demo purposes only</p>
          </div>
        </div>

        <!-- edit tags -->
        <div class="field">
          <label class="label">Tags</label>
          <div class="control">
            <input type="text" class="input" v-model="tagString">
            <p>Seperate tags with commas</p>
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
import VueQuillEditor from 'vue-quill-editor';
import editorOptions from './editor-options';
import imageLoader from '../../../mixins/image-loader';
import notifier from '../../../mixins/notifier';

export default {
  data() {
    return {
      /* Here we are filtering out the post containing the provided key in the router params
       * we are using Object.assign to copy the post by value not by reference
       * to prevent updating the poste when typing */
      post: Object.assign(
        {},
        (this.posts.filter((post) => {
          return (post['.key'] === this.$route.params.key);
        }))[0]
      ),
      editorOptions
    }
  },
  props: ['posts', 'update-post'],
  mixins: [imageLoader, notifier],
  methods: {
    // call the updatePost method passed through props
    update() {
      if (this.post.title) {
        this.updatePost(this.post)
      } else {
        this.showNotification('warning', 'The title field can not be empty');
      }
    }
  },
  computed: {
    tagString: {
      get: function () {
        return this.post.tags.join(',');
      },
      set: function (newValue) {
        this.post.tags = newValue.split(',')
      }
    }
  }
}

</script>
