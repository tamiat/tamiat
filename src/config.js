/* This is the Firebase configuration file*/

import Firebase from 'firebase';

let config = {
    apiKey: "AIzaSyDfpaBbgWYpVJULCmSY2WDTGZWok6NcjbY",
    authDomain: "tamiat-bb272.firebaseapp.com",
    databaseURL: "https://tamiat-bb272.firebaseio.com",
    projectId: "tamiat-bb272",
    storageBucket: "tamiat-bb272.appspot.com",
    messagingSenderId: "72857312305"
  };

let app = Firebase.initializeApp(config);
let db = app.database();

// create a database references
const settingsRef = db.ref('settings');
const pagesRef = db.ref('pages');
const postsRef = db.ref('posts');
const usersRef = db.ref('users');
const mediaRef = db.ref('media');

export { postsRef, usersRef, settingsRef, pagesRef, mediaRef };
