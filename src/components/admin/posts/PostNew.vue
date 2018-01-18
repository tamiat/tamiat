<template>
  <v-dialog v-model="dialog" persistent max-width="700px" @close="console.log('close')">
    <v-card>
      <v-card-title>
        <span class="headline">Add post</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex>
              <v-text-field label="Event name"
                required v-model="title" @input.native="$v.title.$touch()"
                :rules="[() => ($v.title.$dirty && $v.title.$error)? 'Please enter name' : true ]">
              </v-text-field>
            </v-flex>
            <v-flex>
              <quill-editor v-model="body" :options="editorOptions">
              </quill-editor>
            </v-flex>
            <v-flex>
              <input @change="uploadFeaturedImage" class="file-input" type="file" name="resume">
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click.native="add">Save</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>
import firebase from 'firebase'
import { postsRef } from '../../../config'

import { mediaRef } from '../../../config'
import VueQuillEditor from 'vue-quill-editor'
import editorOptions from './editor-options'
import imageLoader from '../../../mixins/image-loader'
import notifier from '../../../mixins/notifier'

import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'post-new',
  data() {
    return {
      title: '',
      body: '',
      author: '',
      tags: '',
      featuredImage: '',
      editorOptions,
      dialog: false
    }
  },
  validations: {
    title: { required }
  },
  firebase: {
    media: mediaRef,
    posts: postsRef
  },
  mixins: [ imageLoader, notifier, validationMixin ],
  methods: {
    open () {
      this.dialog = true
    },
    addPost(post) {
      this.$firebaseRefs.posts.push(post).then(() => {

      })
    },
    add() {
      if (this.$v.$invalid) {
        this.$v.$touch()
      }
      if (!this.$v.$error) {
        this.addPost({
          title: this.title,
          body: this.body,
          author: this.author,
          tags: this.tags.split(','),
          img: this.featuredImage,
          created: Date.now()
        })
      }
      // else {
      //   this.showNotification('warning', 'The title field can not be empty');
      // }

    },
    uploadFeaturedImage (e) {
      let file = e.target.files[0]
      let storageRef = firebase.storage().ref('images/' + file.name)
      storageRef.put(file).then((function (snapshot) {
        console.log(snapshot)
        this.featuredImage = snapshot.downloadURL
        if (Object.values(this.media).find(e => e.path === snapshot.ref.fullPath)) return // this prevents duplicate entries in the media object
        this.$firebaseRefs.media.push({
          src: snapshot.downloadURL,
          path: snapshot.ref.fullPath,
          name: snapshot.metadata.name
        })
      }).bind(this))
    }
  }
}

</script>
