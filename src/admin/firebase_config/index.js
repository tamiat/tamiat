/* This is the Firebase configuration file */

import Firebase from 'firebase'
import config from './config'

let app = Firebase.initializeApp(config)
let db = app.database()

// create a database references
const settingsRef = db.ref('settings')
const pagesRef = db.ref('pages')
const postsRef = db.ref('posts')
const usersRef = db.ref('users')
const mediaRef = db.ref('media')
const navRef = db.ref('nav')
const contentsRef = db.ref('contents')
const fieldsRef = db.ref('fields')

export { postsRef, usersRef, settingsRef, pagesRef, mediaRef, navRef, contentsRef, fieldsRef }
