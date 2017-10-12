<div align="center">

<p><img src="https://github.com/tamiat/tamiat/blob/master/tamiatlogo.png" width="55%"></p>

<h1>Tamiat CMS</h1>

<p>
  <strong>Tamiat headless CMS</strong>
</p>

<p>
  <sub>Made with ❤︎ by
    <a href="https://github.com/mahnouman">Mahmoud Nouman</a> and
    <a href="https://github.com/tamiat/tamiat/graphs/contributors">contributors</a>
  </sub>
</p>

</div>

---

<p align="center">
  <strong>Support Tamiat CMS's development with:</strong>
  <a href="https://patreon.com/tamiatcms" target="_blank"> Patreon </a>
</p>

[Vue]: http://vuejs.org/
[Firebase]: https://firebase.google.com/

---



# Features

* Front end focused CMS.
* Powered by [Vue][] **2.0** & [Firebase]



# What It Looks Like:

![posts section](https://i.imgur.com/Kstbzxu.png)
![pages section](https://i.imgur.com/XDyOayH.png)
![media section](https://i.imgur.com/54vjwey.jpg)


<br>

# Get Started


To get started with Tamiat CMS, you have two options:

  - Making Tamiat your starting point.
  - Integrating Tamiat into an existing project.

<br>

## Making Tamiat Your Starting Point

  1. Clone the CMS repository and install the dependencies. 

```bash
# clone the repo
git clone https://github.com/tamiat/tamiat.git

# install the dependencies
npm install
# or
yarn
```

  2. Log in to firebase console using your google account and create a new firebase project.


  3. In the authentication section, add a new user by providing an email and a password.


  4. Setup your database basic security rules by going to the `database.rules.json` file in your project and fill in your UID.


```js
{
  "rules": {
    ".write": "(auth.uid === yourUID) || (auth.uid === anOtherUID)" // you can chain these together like so
```


> yourUID and anOtherUID are the uids of users with permission to write to the database. They look something like this "Lxgqp3FmcPVU6UYO6gNdkn1i0ok1". You can obtain a user uid from the authentication section in the firebase console.


  5. Copy your project configurations from WEB SETUP (*in `authentication` section of the firebase console*) and paste them in `config.js` file by replacing the existing ones.


```js
// replace the existing config object below
let config = {
  apiKey: "AIzaSyCnxuLX6AgMduDMLtSJVDNJhR8xuMNvs4Y",
  authDomain: "tamiat-demo.firebaseapp.com",
  databaseURL: "https://tamiat-demo.firebaseio.com/",
  projectId: "tamiat-demo",
  storageBucket: "",
  messagingSenderId: "188459960333"
};
```


  6. Run the `firebase init` command (if you haven't installed firebase yet, do so), select your project from the list, use the default database rules already present `database.rules.json`, choose `dist` as your public directory and configure the project as a single-page app.


  7. You can now use `firebase deploy` to deploy the security rules you just entered (to deploy the actual web app you must first use `npm run build` or `yarn build`).


  8. Run the local dev server with `npm run dev` or `yarn dev`.


  9. Access the admin interface by navigating to `localhost:8080/admin`.


  10. Sign in with your previous email and password.


  11. Enjoy! 

<br>

## Integrating Tamiat Into an Existing Project

  1. Create a new vue.js project based on webpack template.

```bash
vue init webpack my-project
# install webpack template dependencies
npm install
```

  2. Install the required dependencies by Tamiat.

```bash
cd my-project

# install development dependencies
npm install node-sass sass-loader --save-dev

# install production dependencies
npm install vue-router bulma firebase vuefire font-awesome vue-quill-editor 
```

  3. In `main.js` file, import the external stylesheets and the necessary plugins and activate them.

```js
import router from './router'
import VueFire from 'vuefire'
import VueQuillEditor from 'vue-quill-editor'

// import external stylesheets
import fontAwesome from '../node_modules/font-awesome/css/font-awesome.css'
import bulma from '../node_modules/bulma/css/bulma.css'

Vue.use(VueFire)  // activate vuefire plugin
Vue.use(VueQuillEditor)  // activate vue-quill-editor
```

> **Remember, don't forget to add the `router` property to the vue instance.**

```js
new Vue({
  el: '#app',
  router,  // this property should be added to the vue instance
  template: '<App/>',
  components: { App }
})
```

  4. Clean up your `App.vue` file by deleting the extra content and making it similar to that:

```html
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
```

  5. Now, open the Tamiat CMS repo and copy the following folders and files:

##### Folders to be copied:

| Source | Target | Comment |
|--------|--------|---------|
| Tamiat/src/components | my-project/src/components | The building blocks components of the admin interface |
| Tamiat/src/mixins | my-project/src/mixins | The shared functionalities between components |
| Tamiat/src/router | my-project/src/router | The routing logic of the CMS |


##### Files to be copied:

| Source | Target | Comment |
|--------|--------|---------|
| Tamiat/src/Admin.vue | my-project/src/Admin.vue |  The admin's interface main view |
| Tamiat/src/Home.vue | my-project/src/Home.vue | The default home page |
| Tamiat/src/config.js | my-project/src/config.js | The firebase configuration file |


  6. Once this is done, you can just follow the same instructions of the first option above starting from `step 2`.

  7. Enjoy! 
