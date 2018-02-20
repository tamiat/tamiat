<template>
  <div class="container">

    <!-- notification -->
    <transition mode="out-in" name="fade">
      <div v-if="notification.message" :class="'notification is-' + notification.type">
        <button class="delete" @click="hideNotifications"></button>{{notification.message}}
      </div>
    </transition>

    <div class="box">
      <div class="columns">
        <div class="column">
          <h2 class="is-size-3">Database State</h2>
          <p>
            Posts:
            <span v-if="posts.length === 0" class="has-text-danger">
              Empty
              <button class="button is-info" @click="addDemoPost">Add Demo Post</button>
            </span>
            <span v-else class="has-text-success">Contains data</span>
          </p>
          <p>
            Settings:
            <span v-if="settings.length === 0" class="has-text-danger">
              Empty
              <button class="button is-info" @click="addDemoSettings">Add Demo Settings</button>
            </span>
            <span v-else class="has-text-success">Contains data</span>
          </p>
          <p>
            Media:
            <span v-if="media.length === 0" class="has-text-danger">
              Empty <button class="button is-info" @click="addDemoLogo">Add Demo Logo</button>
            </span>
            <span v-else class="has-text-success">Contains data</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import notifier from '../../../mixins/notifier'
import { postsRef, settingsRef, mediaRef } from '../../../config'
export default {
  data () {
    return {
      demoPost: {
        title: 'Demo post',
        body: 'this is a demo post',
        author: 'Some author',
        tags: ['tag1', 'tag2'],
        category: 'category1',
        created: Date.now(),
        selected: false,
        state: 'published'
      },
      demoSettings: {
        title: 'Tamiat CMS',
        description: 'Firebase & Vue.js based CMS'
      },
      demoLogoLink: 'https://raw.githubusercontent.com/tamiat/tamiat/master/tamiatlogo.png'
    }
  },
  firebase: {
    posts: postsRef,
    settings: settingsRef,
    media: mediaRef
  },
  mixins: [notifier],
  methods: {
    addDemoPost () {
      this.$firebaseRefs.posts.push(this.demoPost)
        .then(() => {
          this.showNotification('success', 'Demo Post added successfully')
        })
    },
    addDemoSettings () {
      this.$firebaseRefs.settings.update(this.demoSettings)
        .then(() => {
          this.showNotification('success', 'Demo Settings added successfully')
        })
    },
    addDemoLogo () {
      let storageRef = firebase.storage().ref()
      let logoRef = storageRef.child(`images/tamiatlogo.png`)

      this.fetchLogoBlob()
        .then(blob => {
          logoRef
            .put(blob)
            .then(snapshot => {
              this.addDemoLogoToDB(snapshot)
            })
        })
    },
    fetchLogoBlob () {
      return new Promise((resolve, reject) => {
        fetch(this.demoLogoLink)
          .then(res => {
            return res.blob()
          })
          .then(blob => {
            resolve(blob)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    addDemoLogoToDB (snapshot) {
      this.$firebaseRefs.media.push({
        name: 'WebsiteLogo',
        path: snapshot.ref.fullPath,
        src: snapshot.downloadURL
      })
        .then(() => {
          this.showNotification('success', 'Demo Logo added successfully')
        })
    }
  }
}
</script>
