<template>
  <nav class="navbar has-shadow">

    <!-- the navbar brand -->
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="../../assets/logo.png" alt="Tamiat CMS logo">
      </router-link>
      <div class="navbar-burger burger" data-target="navMenuExample">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <!-- the navbar right menu -->
    <div class="navbar-menu">
      <div class="navbar-end">
        <span class="navbar-item sign-out" @click="signOut">
          logout
        </span>
      </div>
    </div>

  </nav>
</template>

<script>
  import firebase from 'firebase';

  export default {
    methods: {
      signOut() {
        // sign the current user out
        firebase.auth().signOut()
          .then(() => {
            this.$router.push('/');
          })
          .catch(() => {
            console.log('sign out fails');
          })
      }
    }
  }

</script>

<style>
  .navbar {
    position: fixed;
    z-index: 1024;
    width: 100%;
  }

  .sign-out {
    cursor: pointer;
  }

</style>
