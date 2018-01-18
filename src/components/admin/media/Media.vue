<template>
  <div>
    <v-toolbar class="blue darken-1 mb-2">
      <v-toolbar-title class="white--text">Media</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="#" class="button is-info">
        <v-btn class="white blue--text">
          Add media
        </v-btn>
      </router-link>
    </v-toolbar>
    <v-layout v-if="!media.hasOwnProperty('.value')">
      <v-flex xs12 sm4 class="pa-3">
        <v-card v-for="(img, key) in images" :key="key" v-if="img.src && img.path">
          <v-card-media :src="img.src" height="200px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ img.name }}</h3>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn color="blue darken-1 white--text" @click="deleteImage(img.path, key)">
              <v-icon left>delete</v-icon>
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mediaRef } from '../../../config'

export default {
  firebase: {
    // load settings as an object instead of array (default)
    media: {
      source: mediaRef,
      asObject: true
    }
  },
  computed: {
    images () {
      return this.media;
    }
  },
  methods: {
    deleteImage(path, key) {
      let storageRef = firebase.storage().ref(path);
      var that = this;
      storageRef.delete().then(function() {
        that.$firebaseRefs.media.child(key).remove()
      }).catch(function(error) {
        console.error(error)
      });
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
