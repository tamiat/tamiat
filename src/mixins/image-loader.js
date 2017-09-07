import firebase from 'firebase';

export default {
  methods: {
    // upload image file
    uploadImage (e) {
      let file = e.target.files[0];
      let storageRef = firebase.storage().ref('images/' + file.name);

      storageRef.put(file).then((function (snapshot) {
        console.log('Image uploaded');
        this.insertImage(snapshot.downloadURL);
      }).bind(this))
    },
    // insert the uploaded image as a DOM node in the editor
    insertImage (url) {
      let img = document.createElement('img');
      img.src = url;
      document.getElementsByClassName('ql-editor')[0].appendChild(img);
    }
  }
}