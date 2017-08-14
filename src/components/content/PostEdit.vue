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

        <!-- edit post body -->
        <div class="field">
          <label class="label">Post's body</label>
          <div class="control">
            <textarea type="text" class="textarea" v-model="post.body"></textarea>
          </div>
        </div>
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
            <input type="text" class="input" v-model="post.tags">
            <p>Seperate tags with commas</p>
          </div>
        </div>
      </div>

    </div>
    <!-- the form buttons -->
    <button type="submit" class="button is-info" @click="update">Update</button>
    <router-link to="/admin/posts" class="button is-danger">Cancel</router-link>
  </div>
</template>

<script>
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
          }))[0])
      }
    },
    props: ['posts', 'update-post'],
    methods: {
      // call the updatePost method passed through props
      update() {
        this.updatePost(this.post)
      }
    }
  }

</script>
