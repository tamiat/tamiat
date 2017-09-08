<template>
  <nav class="navbar" id="navbar">

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
        <span class="navbar-item">
          {{currentUser.email}}
        </span>
        <span class="navbar-item sign-out" @click="signOut">
          <span class="icon is-medium has-text-centered">
            <i class="fa fa-power-off"></i>
          </span>
        </span>
      </div>
    </div>

  </nav>
</template>

<script>
import firebase from 'firebase';
import { usersRef } from '../../config';

export default {
  data() {
    return {
      currentUser: firebase.auth().currentUser
    }
  },
  firebase: {
    users: usersRef
  },
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

<style lang="scss">
$navbarBg: #333;
$navbarColor: #aaaaaa;

#navbar {
  position: fixed;
  z-index: 1024;
  width: 100%;
  background-color: $navbarBg;

  .navbar-item {
    color: $navbarColor;
    &:hover {
      color: white;
    }
  }

  .sign-out {
    cursor: pointer;
  }
}
</style>
