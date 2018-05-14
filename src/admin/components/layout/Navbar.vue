<template>
  <nav class="navbar" id="navbar">

  <!-- modal for post delete -->
    <transition mode="out-in" name="fade">
      <modal @close="showModal = false" :kind="kind" @confirmLogout='confirmLogout()' v-if="showModal" :header="header"/>
    </transition>

    <!-- the navbar brand -->
    <div class="navbar-brand">
      <router-link class="navbar-item logo" to="/admin">
        <img src="/static/img/tamiat-admin-logo-1.png" alt="logo">
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
        <span class="navbar-item email">
          {{currentUser.email}}
        </span>
        <span class="navbar-item sign-out" @click="signOut">
          <span class="icon is-medium has-text-centered">
            <i class="fa fa-bars fa-2x"></i>
          </span>
        </span>
      </div>
    </div>

  </nav>
</template>

<script>
import firebase from 'firebase'
import modal from '@/admin/components/shared/Modal'
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
$navbarBg: #fff;
$navbarColor: #aaaaaa;

#navbar {
  position: fixed;
  z-index: 1024;
  width: 100%;
  height: 100px;
  background-color: $navbarBg;

  .logo {
    z-index: 9999;
    background: #fff;
    &:hover {
      background: whitesmoke;
    }
  }

  .navbar-item {
    color: $navbarColor;
    font-weight: bold;
    max-height: 100px;
    &:hover {
      color: #4BB885;
    }
    img{
      max-height: 3rem;
      margin-left: 1.2rem;
    }
  }

  span.email{
    margin-right: -10px;
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
