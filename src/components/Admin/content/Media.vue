<template>
  <div>
    <div class="gallery" v-if="!media.hasOwnProperty('.value')">
      <a class="img-container" v-for="(img, key) in images" v-if="img.src && img.path">
        <div @click="deleteImage(img.path, key)" class="delete delete-button"></div>
        <div class="image-div" :style="{ 'background-image': 'url(' + img.src + ')' }"></div>
        <div class="info-tab"> {{img.name}} </div>
      </a>
    </div>
  </div> 
</template>

<script>
import firebase from 'firebase'

import { mediaRef } from '../../../config';

export default {
  name: "Media",
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
.delete-button {
  position: absolute;
  top: 20px;
  right: 20px;
}

.info-tab {
  position: absolute;
  bottom: 0px;
  height: 28px;
  width: 100%;
  padding: 4px;
  background-color: black;
  color: white;
  opacity: 0.71;
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