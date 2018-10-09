<template>
  <div>
    <div class="gallery" v-if="!media.hasOwnProperty('.value')">
      <a class="img-container" v-for="(img, key) in images" :key="key" v-if="img.src && img.path">
        <span @click="deleteImage(img.path, key)" class="delete delete-button"></span>
        <div class="image-div" :style="{ 'background-image': 'url(' + img.src + ')' }"></div>
        <div class="info-tab"> {{img.name}} </div>
      </a>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

import { mediaRef } from '@/admin/firebase_config'

export default {
  name: 'Media',
  data: function () {
    return {
    }
  },
  firebase: {
    // load settings as an object instead of array (default)
    media: {
      source: mediaRef,
      asObject: true
    }
  },
  computed: {
    images () {
      return this.media
    }
  },
  methods: {
    imageLoadError (tag) {
      console.log(tag)
    },
    deleteImage (path, key) {
      let storageRef = firebase.storage().ref(path)
      var that = this
      storageRef.delete().then(function () {
        that.$firebaseRefs.media.child(key).remove()
      }).catch(function (error) {
        console.error(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
.img-container {
  position: relative;
  width: 400px;
  height: 400px;
}
.delete-button {
  position: absolute;
  top: 35px;
  left: 90%;
}
.info-tab {
  position: absolute;
  bottom: 0px;
  height: 28px;
  width: 100%;
  padding: 4px;
  text-align: center;
  background-color: black;
  color: white;
  opacity: 0.71;
}
.image-div {
  height: 100%;
  width: 100%;
  background-size: cover;
}
</style>
