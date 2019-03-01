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

        <!-- Category (select) fields -->
        <br>
        <div class="field" v-for="(field, index) in fields" :key="index" v-if="field.type === 'select'">
          <label class="label">{{ field.name }}</label>
          <div class="columns">
            <div class="column">
              <div class="select margin-select">
                <select>
                  <option v-for="(selectOption, selectIndex) in content[field.name]" :key="selectIndex">{{ selectOption }}</option>
                </select>
              </div>
            </div>
            <div class="column">
              <!--area to delete options-->
              <div v-for="(option, optionKey) in content[field.name]" :key="optionKey" >
                <span @click="removeTag(optionKey, field.name)" class="tag is-info pointer">{{option}}
                <button class="delete is-small"></button>
              </span>
              </div>
            </div>
          </div>
          <!--area to enter options-->
          <div class="control">
            <input type="text" class="input" :placeholder="field.name" @blur="styleOptions(field.name)" @keyup.enter="styleOptions(field.name)" v-model="selectOptionsRow" maxlength="25">
          </div>
          <p>Separate options with commas</p>
        </div>

        <!-- Integer fields -->
        <br>
        <div class="field" v-for="(field, index) in fields" :key="index" v-if="field.type === 'integer'">
          <label class="label">{{ field.name }}</label>
          <div class="columns">
            <div class="column is-one-third">
              <input type="number" :placeholder="field.name" class="input">
            </div>
          </div>
        </div>

        <!-- Url fields -->
        <br>
        <div class="field" v-for="(field, index) in fields" :key="index" v-if="field.type === 'url'">
          <label class="label">{{ field.name }}</label>
          <div class="columns">
            <div class="column is-two-fifths">
              <span>Name</span>
              <input :placeholder="field.name + ' name'" class="input" v-model="content.url.name">
            </div>
            <div class="column is-two-fifths">
              <span>Link</span>
              <input :placeholder="field.name + ' link'" class="input" v-model="content.url.link">
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <span>Preview: </span>
              <a :href="content.url.link">{{ content.url.name }}</a>
            </div>
          </div>
        </div>
        <!---->
      </div>



      <!-- Right sidebar -->
      <div class="column is-one-third">

        <!-- Tag fields -->
        <div class="field" v-for="(field, index) in fields" :key="index" v-if="field.type === 'tags'">
          <label class="label">{{ field.name }}</label>
          <div class="control">
            <div class="tags tagscontainer">
              <span @click="removeTag(tagKey, field.name)" v-for="(tag, tagKey) in content[field.name]" :key="tagKey" class="tag is-info pointer">{{tag}}
                <button class="delete is-small"></button>
              </span>
              <input :placeholder="field.name" @blur="styleTags(field.name)" @keyup.enter="styleTags(field.name)" type="text" class="input" maxlength="25" v-model="inputData">
            </div>
            <p>Separate tags with commas</p>
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
import firebase from 'firebase/app'
import 'firebase/storage'

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
       * to prevent updating the post when typing */
      inputData: '',
      selectOptionsRow: '',
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
        this.inputData.split(',').forEach(tag => {
          this.content[fieldName].push(`${tag.trim()}`)
        })
        this.inputData = ''
      }
    },
    removeTag (index, fieldName) {
      // function to remove tags and options
      // cloning object (to make Vue reactive)
      let currentContent = Object.assign({}, this.content)
      // delete element from arr
      currentContent[fieldName].splice(index, 1)
      // return cloned object Back
      this.content = Object.assign({}, currentContent)
    },
    // function to create Select Options from input area
    styleOptions (fieldName) {
      if (this.selectOptionsRow !== '') {
        if (!this.content[fieldName]) {
          this.content[fieldName] = []
        }
        this.selectOptionsRow.split(',').forEach(tag => {
          this.content[fieldName].push(`${tag.trim()}`)
        })
        this.selectOptionsRow = ''
      }
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
