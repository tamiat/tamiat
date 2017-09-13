<template>
  <div class="admin bulma" id="admin">
    <!-- The admin page layout -->
    <navbar></navbar>
    <sidebar></sidebar>

    <!-- The admin page content -->
    <div class="wrapper">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import firebase from 'firebase';

export default {
  components: {
    'navbar': Navbar,
    'sidebar': Sidebar
  },
  // prevent unauthenticated users from accessing the admin area
  // and direct them to the login page
  beforeRouteEnter(to, from, next) {
    // get the current logged in user
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // continue to /admin
        next();
      } else {
        // redirect to /login 
        next('/login');
      }
    })
  }
};

</script>

<style lang="sass">

#admin
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

</style>