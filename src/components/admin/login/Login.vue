<template>
  <v-container text-xs-center class="pt-5">
    <v-layout class="mb-5">
      <v-flex>
        <router-link to="/">
          <img src="/static/img/logo.png" alt="Tamiat logo">
        </router-link>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex md4 offset-md4 xs12>
        <v-form v-model="valid" @submit.prevent="login">
          <v-text-field
            label="E-mail"
            v-model="email"
            :rules="emailRules"
            required
          ></v-text-field>
          <v-text-field
            label="Password"
            v-model="password"
            :rules="passRules"
            required :type="'password'"
          ></v-text-field>
          <v-btn color="primary" type="submit">Login</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase'
import notifier from '../../../mixins/notifier'

export default {
  data() {
    return {
      email: '',
      password: '',
      valid: false,
      emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      passRules: [
        (v) => !!v || 'Password is required'
      ]
    }
  },
  mixins: [notifier],
  methods: {
    login () {
      // login to firebase with email and password
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          // redirect to the admin page
          this.$router.push('/admin');
        })
        .catch((error) => {
          // display an warning notification
          this.showNotification('warning', error.message);
        })
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
