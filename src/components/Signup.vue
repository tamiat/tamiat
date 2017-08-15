<template>
  <div class="container login">
    <div class="columns is-centered is-vertical-aligned is-fullheight is-flex">
      <div class="column box is-one-third">

        <!-- warning notification -->
        <div v-if="err.code" class="notification is-warning">
          <button class="delete" @click="hideNotif"></button>{{err.message}}
        </div>

        <!-- warning notification -->
        <div v-if="userUID" class="notification is-success">
          <button class="delete" @click="hideNotif"></button> You have signed up successfully
        </div>

        <!-- tamiat CMS logo -->
        <div class="columns is-flex is-centered is-mobile">
          <figure class="column is-half">
            <router-link to="/"><img src="../assets/logo.png" alt="Tamiat logo"></router-link>
          </figure>
        </div>

        <!-- username -->
        <div class="field columns">
          <div class="control column">
            <input type="text" class="input" placeholder="Username" v-model="username" @focus="hideNotif">
          </div>
        </div>

        <!-- email -->
        <div class="field columns">
          <div class="control column">
            <input type="email" class="input" placeholder="Email" v-model="email" @focus="hideNotif">
          </div>
        </div>

        <!-- password -->
        <div class="field columns">
          <div class="control column">
            <input type="password" class="input" placeholder="Password" v-model="password" @focus="hideNotif">
          </div>
        </div>

        <!-- submit button -->
        <button class="button is-info is is-fullwidth" @click="signUp">Sign Up</button>
        <p>
          You already have an account
          <router-link to="/login">Login</router-link>
        </p>

      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase';

  export default {
    data() {
      return {
        // All the fields required in the login page
        username: '',
        email: '',
        password: '',
        err: {
          code: '',
          message: ''
        },
        userUID: ''
      }
    },
    methods: {
      signUp() {
        // check if all fields are filled
        if (this.email && this.username && this.password) {
          // create a new user with the provided email and password
          firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then((user) => {
              // if user created successfully add it to the db and display a success message
              this.userUID = user.uid;
              this.addUser(user.uid);
            })
            // if creating user fails display an error message
            .catch(err => this.err = Object.assign({}, err));
        } else {
          this.err.code = 'Empty Fields !!';
          this.err.message = 'please fill in all the fields !'
        }
      },
      hideNotif() {
        // hide all notifications
        this.err.code = '';
        this.err.message = '';
        this.userUID = '';
      },
      addUser(userUID) {
        // add the new user credentiels to the database using the same ID
        firebase.database().ref('users/' + userUID).set({
          username: this.username,
          email: this.email,
          role: 'guest'
        });
      }
    }
  }

</script>

<style>
  html,
  body,
  #app {
    background-color: #F1F1F1;
  }

  .is-vertical-aligned {
    align-items: center;
  }

  .is-fullheight {
    height: 100vh;
  }

  .login>div {
    padding: 20px;
  }

  .login .box {
    padding: 20px 10px;
  }

  .login p {
    margin-top: 1em;
    font-size: 0.8em;
  }

</style>
