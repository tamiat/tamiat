/* This is the Firebase configuration file */

import Firebase from 'firebase'

let config = {
  apiKey: 'AIzaSyDN6vYIk-89PI1y1gmI8P-33hvZ8NxT3iI',
  authDomain: 'tamiatcms.firebaseapp.com',
  databaseURL: 'https://tamiatcms.firebaseio.com',
  projectId: 'tamiatcms',
  storageBucket: 'tamiatcms.appspot.com',
  messagingSenderId: '94963392700'
}

let app = Firebase.initializeApp(config)
let db = app.database()

// create a database references
const settingsRef = db.ref('settings')
const pagesRef = db.ref('pages')
const postsRef = db.ref('posts')
const usersRef = db.ref('users')
const mediaRef = db.ref('media')
const navRef = db.ref('nav')

export { postsRef, usersRef, settingsRef, pagesRef, mediaRef, navRef }
