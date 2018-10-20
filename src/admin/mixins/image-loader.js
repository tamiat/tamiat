// USED BY TAMIAT CMS

import firebase from 'firebase/app'
import 'firebase/storage'
import { mediaRef } from '@/admin/firebase_config'

export default {
  methods: {
    async uploadImage (e) {
      let file = e.target.files[0]
      let storageRef = firebase.storage().ref('images/' + file.name)

      let snapshot = await storageRef.put(file)

      this.createNewMedia(snapshot)

      snapshot.ref.getDownloadURL().then(downloadURL => {
        this.insertImageIntoDOM(downloadURL)
      })
    },
    createNewMedia (snapshot) {
      snapshot.ref.getDownloadURL().then(downloadURL => {
        mediaRef.push({
          src: downloadURL,
          path: snapshot.ref.fullPath,
          name: snapshot.metadata.name
        })
      })
    },
    insertImageIntoDOM (url) {
      let img = document.createElement('img')
      img.src = url
      document.getElementsByClassName('ql-editor')[0].appendChild(img)
    }
  }
}
