<template>
  <nav class="navbar" id="navbar">

  <!-- modal for post delete -->
    <transition mode="out-in" name="fade">
      <modal @close="showModal = false" :kind="kind" @confirmLogout='confirmLogout()' v-if="showModal" :header="header"/>
    </transition>

    <!-- the navbar brand -->
    <div class="navbar-brand">
      <router-link class="navbar-item logo" to="/admin">
        <div style="pointer-events: none">
          <!-- <img src="/static/img/logo.png" alt="Tamiat CMS logo"> -->
        </div>
      </router-link>
      <div class="navbar-burger burger" data-target="navbar" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <!-- the navbar right menu -->
    <div class="navbar-menu" id="navbar" :class="{'is-active': mobileMenuIsActive}">
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
import firebase from 'firebase'
import { usersRef } from '@/firebase_config'
import modal from '@/components/shared/Modal'
export default {
  name: 'navbar',
  data () {
    return {
      mobileMenuIsActive: false,
      currentUser: firebase.auth().currentUser,
      showModal: false,
      header: 'Are you sure you want to logout?',
      kind: 'logout'
    }
  },
  firebase: {
    users: usersRef
  },
  methods: {
    signOut () {
      this.showModal = true
    },
    confirmLogout () {
      // sign the current user out
      firebase.auth().signOut()
        .then(() => {
          this.showModal = false
          this.$router.push('/')
        })
        .catch(() => {
          console.log('sign out fails')
        })
    },
    toggleMenu () {
      this.mobileMenuIsActive = !this.mobileMenuIsActive
    }
  },
  components: {
    modal
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
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  .logo {
    z-index: 9999;
    background: #fff;
    &:hover {
      background: whitesmoke;
    }
  }

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
@media screen and (max-width: 1023px) {
  #navbar {
    .navbar-menu {
      width: auto;
      right: 0;
    }
    .sign-out {
      text-align: right;
    }
    .navbar-burger span {
      background: #fff;
    }
  }
}
</style>
