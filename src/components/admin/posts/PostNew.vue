<template>
  <v-dialog v-model="dialog" persistent max-width="700px">
    <v-card>
      <v-card-title>
        <span class="headline">Add post</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex>
              <v-text-field label="Post title"
                required v-model="title" @input="$v.title.$touch()"
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
            <v-flex xs12>
              <v-text-field label="Tags"
                required v-model="model" @input="$v.model.$touch()"
                :rules="[() => ($v.model.$dirty && $v.model.$error)? 'Invalid tag name' : true ]"
                @keypress.prevent.tab.enter="addTag">
              </v-text-field>
            </v-flex>
            <v-flex xs12 v-if="tags.length">
              <v-chip close @input="removeTag(tag)" v-for="tag in tags" :key="tag">{{ tag }}</v-chip>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click="add">Save</v-btn>
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
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  name: 'post-new',
  data() {
    return {
      title: '',
      body: '',
      author: '',
      tags: [],
      featuredImage: '',
      editorOptions,
      model: '',
      dialog: false
    }
  },
  validations: {
    title: { required },
    model: { required, maxLength: maxLength(15) }
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
    addTag () {
      if (this.$v.model.$invalid) {
        this.$v.model.$touch()
      }
      if (!this.$v.model.$error && (this.tags.indexOf(this.model) === -1)) {
        this.tags.push(this.model)
        this.model = ''
        this.$v.$reset()
      }
    },
    removeTag (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    add() {
      if (this.$v.$invalid) {
        this.$v.$touch()
      }
      if (!this.$v.$error) {
        let post = {
          title: this.title,
          body: this.body,
          tags: this.tags,
          img: this.featuredImage,
          created: Date.now()
        }
        this.$firebaseRefs.posts
        .push(post).then(() => {
          this.dialog = false
        })
      }
    },
    uploadFeaturedImage (e) {
      let file = e.target.files[0]
      let storageRef = firebase.storage().ref('images/' + file.name)
      storageRef.put(file).then((function (snapshot) {
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
