<template>
  <v-container text-xs-center class="pa-0">
    <v-alert color="error" icon="error" dismissible v-model="alert" class="mt-0"
             transition="slide-y-transition">
      {{ error }}
    </v-alert>
    <v-layout class="mb-5 pt-5">
      <v-flex>
        <router-link to="/">
          <img src="/static/img/logo.png" alt="Tamiat logo">
        </router-link>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex md4 offset-md4 xs12>
        <v-form @submit.prevent="login">
          <v-text-field
            label="E-mail"
            placeholder="E-mail"
            v-model="email"
            :errorMessages="emailErrors"
            @input="$v.email.$touch()"
            required
            autofocus
          ></v-text-field>
          <v-text-field
            label="Password"
            placeholder="Password"
            v-model="password"
            :errorMessages="passwordErrors"
            @input="$v.password.$touch()"
            required type="password"
          ></v-text-field>
          <v-btn color="primary" type="submit">Login</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import firebase from "firebase"
import { validationMixin } from "vuelidate"
import { required, email } from "vuelidate/lib/validators"

export default {
  data() {
    return {
      email: "",
      password: "",
      alert: false,
      error: "",
    }
  },
  validations: {
    email: { required, email },
    password: { required },
  },
  computed: {
    emailErrors() {
      if (this.$v.email.$dirty && this.$v.email.$error) {
        return ["Email is incorrect."]
      }
    },
    passwordErrors() {
      if (this.$v.password.$dirty && this.$v.password.$error) {
        return ["Password is incorrect."]
      }
    },
  },
  mixins: [validationMixin],
  methods: {
    login() {
      this.alert = false
      this.error = ""
      this.$v.$touch()
      if (!this.$v.$invalid) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(user => {
            this.$router.push("/admin/posts")
          })
          .catch(error => {
            this.error = error.message
            this.alert = true
          })
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
