<template>
  <div class="admin bulma" id="admin">
    <!-- The admin page layout -->
    <navbar></navbar>
    <sidebar></sidebar>

    <!-- The admin page content -->
    <div class="admin-wrapper">
      <section class="hero is-light is-medium is-bold" v-if="$route.name === 'Admin'">
        <div class="hero-body ">
          <div class="container has-text-centered">
            <div class="titleAdmin">
              <h1 class="title">
                Welcome to Tamiat CMS
              </h1>
            </div>
            <h2 class="subtitle">
              <a href="https://github.com/tamiat/tamiat" target="_blank">
                <span style="font-size: 25px;font-weight: bold">GitHub</span>
              </a>
            </h2>
            <router-link to="/">
              <!-- <img src="/static/img/logo.png" alt="Tamiat CMS logo"> -->
              <div>
                <object type="image/svg+xml" data="static/img/tamiat-logo-icon-color.svg" style="pointer-events: none; height: 7rem"></object>
              </div>
            </router-link>
            <p>Version v0.3.0</p>
          </div>
        </div>
      </section>
      <router-view :key="$route.path" />
    </div>

  </div>
</template>

<script>
import Navbar from '@/admin/components/layout/Navbar'
import Sidebar from '@/admin/components/layout/Sidebar'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'admin',
  components: {
    'navbar': Navbar,
    'sidebar': Sidebar
  },
  // prevent unauthenticated users from accessing the admin area
  // and direct them to the login page
  beforeRouteEnter (to, from, next) {
    // get the current logged in user
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // continue to /admin
        next()
      } else {
        // redirect to /login
        next('/login')
      }
    })
  }
}

</script>

<style lang="sass">
@import '../styles/index'
</style>
