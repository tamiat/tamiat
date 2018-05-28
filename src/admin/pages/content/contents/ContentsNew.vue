<template>
  <div class="box">

    <div class="columns">

      <div class="column is-two-thirds">

        <!-- Textbox fields -->
        <div class="field" v-for="(field, index) in fields" :key="index" v-if="field.type === 'textbox'">
          <label class="label">{{ field.name }}</label>
          <div class="control">
            <input type="text" class="input" maxlength="25" required :placeholder="field.name" v-model="newContent[field.name]">
          </div>
        </div>

        <!-- Textarea fields -->
        <div class="field" v-for="(field, index) in fields" :key="index" v-if="field.type === 'textarea'">
          <label class="label">{{ field.name }}</label>
          <div class="control">
            <textarea class="input" v-model="newContent[field.name]" :placeholder="field.name" v-text="newContent[field.name]"></textarea>
          </div>
        </div>

        <!-- Rich text fields - vue-quill-editor plugin -->
        <div v-for="(field, index) in fields" :key="index" v-if="field.type === 'richtextbox'">
          <quill-editor v-model="newContent[field.name]" :options="editorOptions">
          </quill-editor>
          <input type="file" id="getImage" style="display: none;" @change="uploadImage">
        </div>

        <!-- Category fields -->
        <br>
        <div class="field" v-for="(field, index) in fields" :key="index" v-if="field.type === 'select'">
          <label class="label">{{ field.name }}</label>
          <div class="control">
            <input type="text" class="input" :placeholder="field.name" v-model="newContent[field.name]" maxlength="25">
          </div>
        </div>

      </div>

      <!-- Right sidebar -->
      <div class="column is-one-third">

        <!-- Tag fields -->
        <div class="field" v-for="(field, index) in fields" :key="index" v-if="field.type === 'tags'">
          <label class="label">{{ field.name }}</label>
          <div class="control">
            <div class="tags tagscontainer">
            <span @click="removeTag(tagKey, field.name)" v-for="(tag, tagKey) in newContent[field.name]" :key="tagKey" class="tag is-info pointer">{{tag}}<button class="delete is-small"></button></span>
            <input :placeholder="field.name" @keyup.enter="styleTags(field.name)" type="text" class="input" maxlength="25" v-model="inputData">
            </div>
            <p>Seperate tags with commas</p>
          </div>
        </div>

        <!-- Image fields -->
        <div class="field" v-for="(field, index) in fields" :key="index" v-if="field.type === 'image'">
          <label class="label">{{ field.name }}</label>
          <div class="control">
            <img :src="newContent[field.name]">
            <div class="file">
              <label class="file-label">
                <input @change="uploadFeaturedImage($event, field.name)" class="file-input" type="file" name="resume">
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
    <router-link :to="'/admin/content/' + $route.params.key" class="button is-danger">Cancel</router-link>
  </div>
</template>

<script>
import Vue from 'vue'
import firebase from 'firebase'
import { mediaRef } from '@/admin/firebase_config'
import editorOptions from '@/admin/utils/editor-options'
import imageLoader from '@/admin/mixins/image-loader'
import notifier from '@/admin/mixins/notifier'

export default {
  name: 'content-new',
  firebase: {
    media: mediaRef
  },
  props: ['add-content', 'fields'],
  mixins: [imageLoader, notifier],
  data () {
    return {
      newContent: {},
      tags: [],
      inputData: '',
      editorOptions
    }
  },
  methods: {
    add (state) {
      console.log('Created new content: ' + this.newContent)
      this.newContent.created = Date.now()
      this.newContent.selected = false
      this.newContent.state = state

      this.addContent(this.newContent)
      this.$router.push({ path: '/admin/content/' + this.$route.params.key })
    },
    uploadFeaturedImage (e, fieldName) {
      console.log(e)
      let file = e.target.files[0]
      let storageRef = firebase.storage().ref('images/' + file.name)

      storageRef.put(file).then((snapshot) => {
        return new Promise((resolve, reject) => {
          snapshot.ref.getDownloadURL().then(url => {
            snapshot.downloadURL = url
            resolve(snapshot)
          })
        })
      }).then((snapshot) => {
        console.log(snapshot)
        Vue.set(this.newContent, fieldName, snapshot.downloadURL)
        if (Object.values(this.media).find(e => e.path === snapshot.ref.fullPath)) return // this prevents duplicate entries in the media object
        this.$firebaseRefs.media.push({
          src: snapshot.downloadURL,
          path: snapshot.ref.fullPath,
          name: snapshot.metadata.name
        })
      })
    },
    styleTags (fieldName) {
      if (this.inputData !== '') {
        if (!this.newContent[fieldName]) {
          this.newContent[fieldName] = []
        }
        this.newContent[fieldName].push(`${this.inputData.trim()}`)
        this.inputData = ''
      }
    },
    removeTag (index, fieldName) {
      this.newContent[fieldName].splice(index, 1)
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
