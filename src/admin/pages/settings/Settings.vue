<template>
  <div class="container settings" id="settings">

    <!-- notification -->
    <transition mode="out-in" name="fade">
      <div v-if="notification.message" :class="'notification is-' + notification.type">
        <button class="delete" @click="hideNotifications"></button>{{notification.message}}
      </div>
    </transition>
    <!-- modal for add setting -->
    <transition mode="out-in" name="fade">
      <modal @close="showModal = false" :kind="kind" @addSetting='confirmAddSetting' @confirmDeleteSetting="confirmDeleteSetting()" v-if="showModal" :header="header" />
    </transition>

    <h2>General settings</h2>
    <div class="box">
      <div class="columns">

        <div class="column is-one-third">
          <div class="field columns">
            <div class="control column is-two-thirds">
              <div class="field">
                <label class="label">Website logo</label>
                <div class="control">
                  <img :src="websiteLogo">
                  <div class="file">
                    <label class="file-label">
                      <input @change="uploadWebsiteLogo" class="file-input" type="file" name="resume">
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
        </div>
        <div class="column is-multiline">
          <div v-for="(field, key) in settings" class="field columns" :key="key" v-if="key !== '.key'">
            <div class="column is-one-third">
              <span class="tag">
                {{key}}
                <button class="delete is-small" @click="deleteSettingsField(key)"></button>
              </span>
            </div>

            <div class="control column is-two-thirds">
              <input type="text" class="input" :name="field" :placeholder="field" v-model="settings[key]">
            </div>
          </div>
          <!-- Main container -->
          <nav class="level">
            <!-- Left side -->
            <div class="level-left">
              <!--<div class="level-item"></div>-->
            </div>
            <!-- Right side -->
            <div class="level-right">
              <div class="level-item">
                <button type="button" class="button is-pulled-right" @click="addSettingField">
                  Add Settings field
                </button>
              </div>
              <div class="level-item">
                <button type="button" class="button is-info is-pulled-right" @click="saveSettings">
                  Save Settings
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>

    <!-- nav builder -->
    <nav-builder></nav-builder>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/storage'
import { mediaRef, settingsRef } from '@/admin/firebase_config'
import notifier from '@/admin/mixins/notifier'
import modal from '@/admin/components/shared/Modal'
import NavBuilder from './NavBuilder'
import imageLoader from '@/admin/mixins/image-loader'
export default {
  name: 'settings',
  data () {
    return {
      updatesCounter: 0,
      // this array contains settings form fields
      fields: [
        {
          label: 'Site Title',
          name: 'title',
          value: ''
        },
        {
          label: 'Site Description',
          name: 'description',
          value: ''
        }
      ],
      showModal: false,
      header: '',
      kind: '',
      deleteKey: '',
      websiteLogo: ''
    }
  },
  firebase: {
    // load settings as an object instead of array (default)
    settings: {
      source: settingsRef,
      asObject: true
    },
    media: mediaRef
  },
  mixins: [notifier, imageLoader],
  methods: {
    saveSettings () {
      delete this.settings['.key'] // This is a bit weird but no problem
      this.$firebaseRefs.settings.update(this.settings).then(() => {
        this.showNotification('success', 'Settings Successfully saved')
      })
    },
    // display the loaded settings
    displaySettings () {
      for (let key in this.settings) {
        this.fields.map((field) => {
          if (field.name === key) {
            field.value = this.settings[key]
            return this.settings[key]
          }
        })
      }
    },
    addSettingField () {
      this.header = 'Name for a new setting: '
      this.kind = 'addSetting'
      this.showModal = true
    },
    confirmAddSetting (value) {
      if (value === '') {
        this.showNotification('danger', 'Please input the name of the setting first')
        return
      }
      if (this.settings.hasOwnProperty(value)) {
        this.showNotification('danger', 'This setting already exist')
        return
      }

      this.$firebaseRefs.settings.update({
        [value]: ''
      }).then(() => {
        this.showNotification('success', 'Setting Successfully added')
        this.showModal = false
      }).catch(() => {
        this.showNotification('error', 'Setting not added')
      })
    },
    deleteSettingsField (key) {
      this.header = 'Are you sure you want to delete this setting?'
      this.kind = 'deleteSetting'
      this.showModal = true
      this.deleteKey = key
    },
    confirmDeleteSetting () {
      this.$firebaseRefs.settings
        .child(this.deleteKey)
        .remove()
        .then(() => {
          this.showNotification('success', 'Setting successfully removed')
          this.showModal = false
          this.deleteKey = ''
          this.kind = ''
        })
        .catch((e) => {
          this.showNotification('error', 'Setting not removed')
        })
    },
    uploadWebsiteLogo (e) {
      let file = e.target.files[0]
      let storageRef = firebase.storage().ref('images/' + file.name)

      var i = this.media.length
      var currentLogo = null
      while (i--) {
        if (this.media[i].name === 'WebsiteLogo') {
          currentLogo = this.media[i]
          break
        }
      }
      storageRef.put(file).then((snapshot) => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
          this.websiteLogo = downloadURL

          var logo = {
            src: downloadURL,
            path: snapshot.ref.fullPath,
            name: 'WebsiteLogo'
          }
          // let tempLogo = {...currentLogo}
          //making sure that the image is uploaded into the media object and is registered in tamiat regerdless if it remains a logo or not so it can be used nonetheless
          if (Object.values(this.media).find(e => e.path === snapshot.ref.fullPath)) return
          else {
            this.$firebaseRefs.media.push({
              src: downloadURL,
              path: snapshot.ref.fullPath,
              name: snapshot.metadata.name
            })
          }
          
          // the uploaded image either overrides the current logo or is set in a new media object as such
          if (currentLogo) {
          // delete tempLogo[key]
            this.$firebaseRefs.media.child(currentLogo['.key']).set(logo)
              .then(() => {
                this.showNotification('success', 'Logo uploaded successfully')
              })
          } else {
            this.$firebaseRefs.media.push({
              src: downloadURL,
              path: snapshot.ref.fullPath,
              name: 'WebsiteLogo'
            }).then(() => {
              this.showNotification('success', 'Logo uploaded successfully')
            })
          }
        })
      })
    }
  },
  updated () {
    // run the loaded settings once
    if (this.updatesCounter === 0) {
      this.displaySettings()
    }
    this.updatesCounter++
  },
  components: {
    modal,
    NavBuilder
  }
}

</script>
