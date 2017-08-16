<template>
  <div class="container login">
    <div class="columns is-centered is-vertical-aligned is-fullheight is-flex">
      <div class="column box is-one-third">

        <!-- warning notification -->
        <div v-if="err.code" class="notification is-warning">
          <button class="delete" @click="hideNotif"></button>{{err.message}}
        </div>

        <!-- tamiat CMS logo -->
        <div class="columns is-flex is-centered is-mobile">
          <figure class="column is-half">
            <router-link to="/"><img src="../assets/logo.png" alt="Tamiat logo"></router-link>
          </figure>
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
        <button type="submit" class="button is-info is is-fullwidth" @click="login">Login</button>
        <p>
          Don't have an account
          <router-link to="/signup">Sign Up</router-link>
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
        email: '',
        password: '',
        err: {
          code: '',
          message: ''
        }
      }
    },
    methods: {
      login() {
        // login to firebase with email and password
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then((user) => {
            // return a promise containing the user's credentiels
            return firebase.database().ref('users/' + user.uid).once('value');
          })
          // check if the current user is an admin
          .then((snapshot) => {
            let user = snapshot.val();
            if (user.role === 'admin') {
              // redirect to the admin page
              this.$router.push('/admin');
            } else {
              // display a notification
              this.err.code = 'account not approved';
              this.err.message = 'Your account has not been approved yet';
            }
          })
          .catch((error) => {
            // display an warning notification
            this.err.code = error.code;
            this.err.message = error.message;
          })
      },
      hideNotif() {
        // hide all notifications
        this.err.code = '';
        this.err.message = '';
        this.userUID = '';
      },
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
