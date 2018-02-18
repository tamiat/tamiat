<template>
  <div class="admin bulma" id="admin">
    <!-- The admin page layout -->
    <navbar></navbar>
    <sidebar></sidebar>

    <!-- The admin page content -->
    <div class="wrapper">
      <section class="hero is-light is-medium is-bold" v-if="$route.name === 'Admin'">
        <div class="hero-body ">
          <div class="container has-text-centered">
            <div class="titleAdmin">
              <h1 class="title">
                Welcome to Tamiat CMS
              </h1>
            </div>
            <h2 class="subtitle">
              <a class="button is-dark" href="https://github.com/tamiat/tamiat">
                <span class="icon">
                  <i class="fa fa-github"></i>
                </span>
                <span>GitHub</span>
              </a>
            </h2><br><br>
            <router-link to="/">
              <img src="/static/img/logo.png" alt="Tamiat CMS logo">
            </router-link>
            <p>Version v0.2.2</p>
          </div>
        </div>
      </section>
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import Navbar from './Admin/layout/Navbar'
import Sidebar from './Admin/layout/Sidebar'
import firebase from 'firebase'

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

#admin
  font-family: 'Quicksand', sans-serif
  .wrapper
    width: calc(100% - 110px)
    position: absolute
    top: 52px
    left: 100px
    background-color: #F1F1F1

    .content-heading
      justify-content: baseline
      align-content: center
      align-items: center
      h3
        margin: 1em 1em 1em 0em

  .actions
    display: none
    span
      cursor: pointer

  tr:hover .actions
    display: inline
    span
      padding: 0px 0px 0px 10px

  .notification
    position: fixed
    top: 60px
    right: 10px
    z-index: 2000
    max-width: 90%

  .titleAdmin
    padding-bottom: 15px
</style>
