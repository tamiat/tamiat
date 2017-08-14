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

        <!-- the new post body -->
        <div class="field">
          <label class="label">Post's body</label>
          <div class="control">
            <textarea type="text" class="textarea" v-model="body"></textarea>
          </div>
        </div>
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
    <!-- the form buttons -->
    <button type="submit" class="button is-info" @click="add">Add</button>
    <router-link to="/admin/posts" class="button is-danger">Cancel</router-link>
  </div>
</template>

<script>
  import { postsRef } from '../../config';

  export default {
    data() {
      return {
        title: '',
        body: '',
        author: '',
        tags: ''
      }
    },
    props: ['add-post'],
    methods: {
      add() {
        this.addPost({
          title: this.title,
          body: this.body,
          author: this.author,
          tags: this.tags
        })
      }
    }
  }

</script>
