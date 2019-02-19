<template>
  <nav class="navbar" id="navbar">

    <!-- modal for post delete -->  
    <transition mode="out-in" name="fade">
      <modal class="modal" @close="showModal = false" :kind="kind" @confirmLogout='confirmLogout()' v-if="showModal" :header="header" />
    </transition>

    <!-- the navbar brand -->
    <div class="navbar-brand">
      <router-link class="navbar-item logo" to="/admin">
        <img :src="`${baseUrl}static/img/tamiat-admin-logo-1.png`" alt="logo">
      </router-link>
      <div class="navbar-burger burger" data-target="navbar" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <!-- the navbar right menu -->
    <div class="navbar-menu nav-burger" id="navbar" :class="{'is-active': mobileMenuIsActive}">
      <div class="navbar-end">
        <span class="navbar-item email">
          {{currentUser.email}}
        </span>
        <span class="navbar-item sign-out" @click="signOut">
          <span class="icon is-medium has-text-centered">
            <i class="fa fa-bars fa-2x"></i>
          </span>
        </span>
        <!-- mobile navigation -->
        <div class="is-hidden-tablet">
          <router-link v-for="item in menu" :key="item.index" :to="item.path" class="menu-item">
            <span class="navbar-item">{{ item.name }}</span>
          </router-link>
        </div>
      </div>
    </div>

  </nav>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import modal from '@/admin/components/shared/Modal'
export default {
  name: 'navbar',
  data () {
    return {
      mobileMenuIsActive: false,
      currentUser: firebase.auth().currentUser,
      showModal: false,
      header: 'Are you sure you want to logout?',
      kind: 'logout',
      baseUrl: process.env.BASE_URL,
      menu: [
        {
          name: 'Content',
          path: '/admin/content'
        },
        {
          name: 'Routing',
          path: '/admin/routing'
        },
        {
          name: 'Media',
          path: '/admin/media'
        },
        {
          name: 'Database',
          path: '/admin/database'
        },
        {
          name: 'Settings',
          path: '/admin/settings'
        }
      ]
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
  z-index: 1024;
  background-color: $navbarBg;

  .logo {
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
      color: #4bb885;
    }
    img {
      max-height: 3rem;
      margin-left: 1.2rem;
    }
  }

  span.email {
    margin-right: -10px;
  }

  .sign-out {
    cursor: pointer;
  }
}

.modal {
  z-index: 1025;
}

.nav-burger {
  position: fixed;
  right: 10px;
}

@media screen and (max-width: 1023px) {
  #navbar {
    .navbar-menu {
      width: auto;
      height: auto;
      right: 0;
    }
  }
}
</style>
