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
* **2# option**: integrating Tamiat into an other project.

## Integrating your project into Tamiat.

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

3. In the authentication section, add a new user providing email and password.

4. Copy your project configurations from WEB SETUP and paste them in `config.js` file by replacing the existing ones.

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

3. delete the default **src** folder and replace it with the **src** folder from Tamiat repository.

4. follow the same instructions as above starting from `step 2`.

5. Enjoy!