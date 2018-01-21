<template>
  <div>
    <v-toolbar class="blue darken-1">
      <v-toolbar-title class="white--text">Media</v-toolbar-title>
    </v-toolbar>
    <v-progress-linear v-if="loader" color="orange lighten-2" class="mb-2 mt-0" v-bind:indeterminate="true"></v-progress-linear>
    <v-container grid-list-md text-xs-center class="pa-3">
      <v-layout row wrap v-if="!media.hasOwnProperty('.value')">
        <v-flex xs6 v-for="(img, key) in media" :key="key" v-if="key !== '.key'">
          <v-card>
            <v-card-media :src="img.src" height="200px">
            </v-card-media>
            <v-card-title primary-title>
              <div>
                <p class="subheading mb-0">{{ img.name }}</p>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn color="red darken-1" flat @click="deleteImage(img.path, key)">
                Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <prompt-dialog ref="deleteMedia"></prompt-dialog>
      <v-snackbar :timeout="5000" bottom right v-model="snackbar">
        {{ snackMessage }}
        <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mediaRef } from '../../../config'
import PromptDialog from '../shared/PromptDialog'
import snack from '../../../mixins/snack'

export default {
  components: { PromptDialog },
  data () {
    return {
      loader: true
    }
  },
  firebase: {
    media: {
      source: mediaRef,
      asObject: true,
      readyCallback: function () { this.loader = false }
    }
  },
  mixins: [ snack ],
  methods: {
    deleteImage(path, key) {
      this.$refs.deleteMedia.ask('Delete media?', 'This action cannot be restored.')
        .then(answer => {
          if (answer) {
            let storageRef = firebase.storage().ref(path)
            var that = this
            storageRef.delete()
              .then(function() {
              that.$firebaseRefs.media.child(key).remove()
                .then(() => {
                  this.snack('Media deleted.')
                })
            }).catch(function(error) {
              console.error(error)
            })
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.img-container {
  margin: 10px;
  position: relative;
  background-color: white;
  width: 400px;
  height: 400px;
}

.image-div {
  height: 100%;
  width: 100%;
  background-size: cover;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  // align-content: flex-start;
  align-items: flex-start;
  height: 100vh;
}

.gallery a {
  flex-grow: 1;
  margin: 5px;
}
</style>
