<div align="center">
<p><img src="https://github.com/tamiat/tamiat/blob/master/tamiatlogo.png"></p>

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

# Features

* Front end focused CMS.
* Powered by [Vue][] **2.0** & [Firebase]

[Vue]: http://vuejs.org/
[Firebase]: https://firebase.google.com/

# Get Started
To get started with Tamiat CMS, you have two options:

* **1# option**: Making Tamiat your starting point.
* **2# option**: Integrating Tamiat into an existing project.

## Making Tamiat your starting point.

1. clone the CMS repo and install the dependencies

```bash
# clone the repo
git clone https://github.com/tamiat/tamiat.git

# install the dependencies
npm install
# or
yarn install
```

2. Log in to firebase console using your google account and create a new firebase project.

3. In the authentication section, add a new user providing an email and a password.

4. Setup your database basic security rules by going to `database` section and open the `rules` tab. You can set your security rules as you like, but as a starting point you can make it like this:

```js
{
  "rules": {
    ".read": true,
    ".write": "auth != null"
  }
}
```

> These rules mean that everyone can read from the database, but only authenticated users can write to it.

4. Copy your project configurations from WEB SETUP (*in `authentication` section*) and paste them in `config.js` file by replacing the existing ones.

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

4. run the local dev server.

```bash
npm run dev
```

5. Access the admin interface by navigating to `localhost:8080/admin`.

6. sign in with your previous email and password.

7. Enjoy!

## Integrating Tamiat into an existing project

1. Create a new vue.js project based on webpack template.

```bash
vue init webpack my-project
# install webpack template dependencies
npm install
```

2. Install the required dependencies by Tamiat

```bash
cd my-project

# install development dependencies
npm install node-sass sass-loader --save-dev

# install production dependencies
npm install vue-router bulma firebase vuefire font-awesome vue-quill-editor 
```

3. In `main.js` file, import the external stylesheets and the necessary plugins and activate them, also don't forget to add the `router` property to the vue instance.

```js
import router from './router'
import VueFire from 'vuefire'
import VueQuillEditor from 'vue-quill-editor'

// import external stylesheets
import fontAwesome from '../node_modules/font-awesome/css/font-awesome.css'
import bulma from '../node_modules/bulma/css/bulma.css'

Vue.use(VueFire)  // activate vuefire plugin
Vue.use(VueQuillEditor)  // activate vue-quill-editor

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

```bash
# folders to be copied
# ====================

Tamiat/src/components => my-project/src/components # the building blocks components of the admin interface

Tamiat/src/mixins => my-project/src/mixins # the shared functionalities between components

Tamiat/src/router => my-project/src/router # the routing logic of the CMS

# files to be copied
# ==================

Tamiat/src/Admin.vue => my-project/src/Admin.vue # the admin's interface main view

Tamiat/src/Home.vue => my-project/src/Home.vue # the default home page

Tamiat/src/config.js => my-project/src/config.js # the firebase configuration file
```

6. Once the above is done, you can just follow the same instructions of the first option above starting from `step 2`.

7. Enjoy!