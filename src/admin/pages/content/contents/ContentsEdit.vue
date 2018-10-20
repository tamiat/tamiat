<template>
  <div class="box">
    <div class="columns">

      <div class="column is-two-thirds">

        <!-- Textbox fields -->
        <div class="field" v-for="(field, index) in fields" :key="index" v-if="field.type === 'textbox'">
          <label class="label">{{ field.name }}</label>
          <div class="control">
            <input type="text" class="input" maxlength="25" required :placeholder="field.name" v-model="content[field.name]">
          </div>
        </div>

        <!-- Textarea fields -->
        <div class="field" v-for="(field, index) in fields" :key="index" v-if="field.type === 'textarea'">
          <label class="label">{{ field.name }}</label>
          <div class="control">
            <textarea class="input" v-model="content[field.name]" :placeholder="field.name" v-text="content[field.name]"></textarea>
          </div>
        </div>

        <!-- Rich text fields - vue-quill-editor plugin -->
        <div v-for="(field, index) in fields" :key="index" v-if="field.type === 'richtextbox'">
          <quill-editor v-model="content[field.name]" :options="editorOptions">
          </quill-editor>
          <input type="file" id="getImage" style="display: none;" @change="uploadImage">
        </div>

        <!-- Category fields -->
        <br>
        <div class="field" v-for="(field, index) in fields" :key="index" v-if="field.type === 'select'">
          <label class="label">{{ field.name }}</label>
          <div class="control">
            <input type="text" class="input" :placeholder="field.name" v-model="content[field.name]" maxlength="25">
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
              <span @click="removeTag(tagKey, field.name)" v-for="(tag, tagKey) in content[field.name]" :key="tagKey" class="tag is-info pointer">{{tag}}<button class="delete is-small"></button></span>
              <input :placeholder="field.name" @keyup.enter="styleTags(field.name)" type="text" class="input" maxlength="25" v-model="inputData">
            </div>
            <p>Seperate tags with commas</p>
          </div>
        </div>

        <!-- Image fields -->
        <div class="field" v-for="(field, index) in fields" :key="index" v-if="field.type === 'image'">
          <label class="label">{{ field.name }}</label>
          <div class="control">
            <img :src="content[field.name]">
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
    <button v-if="content.state === 'saved'" type="submit" class="button is-success" @click="update(true)">Update and publish</button>
    <button type="submit" class="button is-info" @click="update(false)">Update</button>
    <router-link :to="'/admin/content/' + $route.params.key" class="button is-danger">Cancel</router-link>
  </div>
</template>

<script>
import firebase from 'firebase'

import { mediaRef } from '@/admin/firebase_config'
import editorOptions from '@/admin/utils/editor-options'
import imageLoader from '@/admin/mixins/image-loader'
import notifier from '@/admin/mixins/notifier'

export default {
  name: 'content-edit',
  data () {
    return {
      /* Here we are filtering out the post containing the provided key in the router params
       * we are using Object.assign to copy the post by value not by reference
       * to prevent updating the poste when typing */
      inputData: '',
      content: Object.assign(
        {},
        (this.contents.filter((c) => {
          return (c['.key'] === this.$route.params.contentKey)
        }))[0]
      ),
      editorOptions
    }
  },
  firebase: {
    media: mediaRef
  },
  props: ['contents', 'update-content', 'fields'],
  mixins: [imageLoader, notifier],
  methods: {
    update (publish) {
      if (publish) {
        this.content.state = 'published'
      }
      this.updateContent(this.content)
    },
    uploadFeaturedImage (e) {
      let file = e.target.files[0]
      let storageRef = firebase.storage().ref('images/' + file.name)

      storageRef.put(file).then((snapshot) => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
          this.content.img = downloadURL
          if (Object.values(this.media).find(e => e.path === snapshot.ref.fullPath)) return // this prevents duplicate entries in the media object
          this.$firebaseRefs.media.push({
            src: downloadURL,
            path: snapshot.ref.fullPath,
            name: snapshot.metadata.name
          })
        })
      })
    },
    styleTags (fieldName) {
      if (this.inputData !== '') {
        if (!this.content[fieldName]) {
          this.content[fieldName] = []
        }
        this.content[fieldName].push(`${this.inputData.trim()}`)
        this.inputData = ''
      }
    },
    removeTag (index, fieldName) {
      this.content[fieldName].splice(index, 1)
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
