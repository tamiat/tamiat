<template>
  <div class="container">

    <!-- notification -->
    <transition mode="out-in" name="fade">
      <div v-if="notification.message" :class="'notification is-' + notification.type">
        <button class="delete" @click="hideNotifications"></button>{{notification.message}}
      </div>
    </transition>

    <h2 class="is-size-3">Database State</h2>
    <div class="box">
      <div class="columns">
        <div class="column">
          <div>
            Posts:
            <span v-if="posts.length === 0" class="has-text-danger">
              Empty
              <button class="button is-info" @click="addDemoPost">Add Demo Post</button>
            </span>
            <span v-else class="has-text-success">Contains data</span>
          </div>

          <div>
            Settings:
            <span v-if="settings.length === 0" class="has-text-danger">
              Empty
              <button class="button is-info" @click="addDemoSettings">Add Demo Settings</button>
            </span>
            <span v-else class="has-text-success">Contains data</span>
          </div>

          <div>
            Media:
            <span v-if="media.length === 0" class="has-text-danger">
              Empty <button class="button is-info" @click="addDemoLogo">Add Demo Logo</button>
            </span>
            <span v-else class="has-text-success">Contains data</span>
          </div>

          <div>
            Nav:
            <span v-if="nav.length === 0" class="has-text-danger">
              Empty <button class="button is-info" @click="addDemoNav">Add Demo Nav</button>
            </span>
            <span v-else class="has-text-success">Contains data</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import {demoData} from '@/../tamiat.config.json'
import notifier from '../../../mixins/notifier'
import { postsRef, settingsRef, mediaRef, navRef } from '../../../config'
export default {
  data () {
    return {...demoData}
  },
  firebase: {
    posts: postsRef,
    settings: settingsRef,
    media: mediaRef,
    nav: navRef
  },
  mixins: [notifier],
  methods: {
    addDemoPost () {
      this.demoPost.created = Date.now()
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
    addDemoNav () {
      let i = this.demoNav.length
      this.demoNav.forEach(link => {
        this.$firebaseRefs.nav.push(link)
          .then(() => {
            i--
            if (i === 0) {
              this.showNotification('success', 'Demo Nav added successfully')
            }
          })
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

<style lang="scss" scoped>
h2 {
  margin: 15px 0px;
}

.column > div {
  margin-top: 15px;
  &:first-child {
    margin-top: 0px;
  }
}

button {
  vertical-align: middle !important;
  margin-left: 30px;
}
</style>
