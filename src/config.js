/* This is the Firebase configuration file*/

import Firebase from 'firebase';

let config = {
  apiKey: "AIzaSyDyfsXCeC4eypYj6sUYbtLE1uO9Zoc-QPw",
  authDomain: "tamiat-demo-d0ac5.firebaseapp.com",
  databaseURL: "https://tamiat-demo-d0ac5.firebaseio.com",
  projectId: "tamiat-demo-d0ac5",
  storageBucket: "tamiat-demo-d0ac5.appspot.com",
  messagingSenderId: "756582340310"
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
