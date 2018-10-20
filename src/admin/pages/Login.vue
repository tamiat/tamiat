<template>
  <div class="container login bulma">
    <div class="columns is-centered is-vertical-aligned is-fullheight is-flex">
      <div class="column box is-one-third">

        <!-- notification -->
        <div v-if="notification.message" :class="'notification is-' + notification.type">
          <button class="delete" @click="hideNotifications"></button>{{notification.message}}
        </div>

        <!-- tamiat CMS logo -->
        <div class="columns is-flex is-centered is-mobile">
          <figure class="column is-half">
            <router-link to="/"><img :src="`${baseUrl}static/img/logo.png`" alt="Tamiat logo"></router-link>
          </figure>
        </div>

        <!-- email -->
        <div class="field columns">
          <div class="control column">
            <input type="email" class="input" placeholder="Email" v-model="email" @keyup.enter="login">
          </div>
        </div>

        <!-- password -->
        <div class="field columns">
          <div class="control column">
            <input type="password" class="input" placeholder="Password" v-model="password" @keyup.enter="login">
          </div>
        </div>

        <!-- submit button -->
        <button type="submit" class="button is-info is is-fullwidth" @click="login">Login</button>

      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import notifier from '@/admin/mixins/notifier'

export default {
  name: 'log-in',
  data () {
    return {
      email: '',
      password: '',
      baseUrl: process.env.BASE_URL
    }
  },
  mixins: [notifier],
  methods: {
    login () {
      // login to firebase with email and password
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          // redirect to the admin page
          this.$router.push('/admin')
        })
        .catch((error) => {
          // display an warning notification
          this.showNotification('warning', error.message)
        })
    }
  }
}

</script>

<style>
.is-vertical-aligned {
  align-items: center;
}

.is-fullheight {
  height: 100vh;
}

.login > div {
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
