/* This is the Firebase configuration file */

import Firebase from 'firebase'
import config from './config'

let app = Firebase.initializeApp(config)
let db = app.database()

// create a database references
const settingsRef = db.ref('settings')
const postsRef = db.ref('posts')
const usersRef = db.ref('users')
const mediaRef = db.ref('media')
const navRef = db.ref('nav')
const contentsRef = db.ref('contents')
const fieldsRef = db.ref('fields')

const routesRef = db.ref('routes')
export { postsRef, usersRef, settingsRef, mediaRef, navRef, routesRef, contentsRef, fieldsRef, db }
