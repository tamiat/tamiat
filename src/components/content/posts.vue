<template>
  <div class="container">

    <!-- posts page title -->
    <div class="content-heading is-flex">
      <h3 class="is-size-3">Posts</h3>
      <router-link to="/admin/posts/new" class="button is-info">Add New</router-link>
    </div>

    <!-- the new post form loaded via vue router -->
    <router-view :add-post="addPost" :update-post="updatePost" :posts="posts"></router-view>

    <!-- posts list -->
    <div class="box">
      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>tags</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts">
            <td>
              <router-link :to="'/admin/posts/edit/' + post['.key']">
                <div>{{post.title}}</div>
              </router-link>

              <div class="actions">
                <router-link :to="'/admin/posts/edit/' + post['.key']">
                  <span>Edit</span>
                </router-link>
                <span @click="deletePost(post)">Delete</span>
              </div>
            </td>
            <td>{{post.author}}</td>
            <td>{{post.tags}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
  import { postsRef } from '../../config';

  export default {
    firebase: {
      posts: postsRef
    },
    methods: {
      addPost(post) {
        // check if all fields are filled
        let allFilled = true;
        for (let key in post) {
          allFilled = allFilled && post[key];
        }
        // If there is no empty fields, save the post to firebase
        if (allFilled) {
          this.$firebaseRefs.posts.push(post);
        }
      },
      deletePost(post) {
        // delete post form firebase
        this.$firebaseRefs.posts.child(post['.key']).remove();
      },
      updatePost(post) {
        // check if all fields are filled
        let allFilled = true;
        for (let key in post) {
          allFilled = allFilled && post[key];
        }
        // If there is no empty fields, save the post to firebase
        if (allFilled) {
          console.log(post['.key'])
          // create a copy of the item
          let tempPost = { ...post }
          // remove the .key attribute
          delete tempPost['.key']
          this.$firebaseRefs.posts.child(post['.key']).set(tempPost)
        }
      }
    }
  }

</script>
