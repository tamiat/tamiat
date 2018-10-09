<template>
  <header class="bg-white">
    <h2>
      <router-link to="/">
        <figure class="websiteLogo" v-if="loadLogo">
          <img :src="loadLogo" alt="logo" style="max-height: 50px;">
        </figure>
        <span v-else>
          Website Logo
        </span>
      </router-link>
    </h2>

    <div :class="['menu-toggle', isNavOpen ? 'on' : '']" @click="isNavOpen = !isNavOpen">
      <div class="one"></div>
      <div class="two"></div>
      <div class="three"></div>
    </div>

    <nav :class="isNavOpen ? '' : 'hidden'">
      <!-- Default Nav Until dynamic nav loads from firebase -->
      <li v-if="nav.length === 0">
        <router-link to="/">Home </router-link>
      </li>
      <li v-if="nav.length === 0">
        <router-link to="/admin">Admin </router-link>
      </li>
      <!-- dynamic nav from firebase -->
      <li v-else v-for="(link, index) in nav" :key="index">
        <a v-if="link.isAbsolute" @click="toggleNav" :href="link.path" target="_blank">{{link.name}} <i v-if="link.children" class="fa"></i></a>
        <router-link v-else @click.native="toggleNav" :to="link.path">{{link.name}} <i v-if="link.children" class="fa"></i></router-link>

        <ul v-if="link.children" class="sub-nav">
          <li v-for="(subLink, index) in link.children" :key="index">
            <a v-if="subLink.isAbsolute" :href="subLink.path" target="_blank">{{subLink.name}}</a>
            <router-link v-else :to="subLink.path">{{subLink.name}}</router-link>
          </li>
        </ul>
      </li>
    </nav>
  </header>
</template>

<script>
import { navRef, mediaRef } from '@/admin/firebase_config'

export default {
  name: 'app-header',
  firebase: {
    // load settings as object instead of array (default)
    nav: {
      source: navRef
    },
    media: {
      source: mediaRef
    }
  },
  computed: {
    loadLogo () {
      var i = this.media.length
      var url = null
      while (i--) {
        if (this.media[i].name === 'WebsiteLogo') {
          url = this.media[i].src
        }
      }
      return url
    }
  },
  data () {
    return {
      isNavOpen: false
    }
  },
  methods: {
    toggleNav (event) {
      const targetElement = event.target.parentElement.parentElement
      if (targetElement.nodeName === 'LI') {
        targetElement.className = targetElement.className === 'open' ? '' : 'open'
      }

      event.preventDefault()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';

/*-------------
       Header
  -------------*/
header {
  z-index: 10;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 20px 42px;
  background: white;
  nav {
    display: flex;
    li {
      text-transform: capitalize;
      i.fa {
        display: none;
      }
    }
    .sub-nav {
      display: none;
      position: absolute;
      left: -47px;
      top: 20px;
      padding-top: 36px;
      margin-top: 5px;
      z-index: 10;
      background: #ffffff;
      li {
        margin: 0px;
        border-bottom: 1px solid #dfdfdf;
        padding: 5px 10px;
        width: 170px;
        &:first-child {
          box-shadow: inset 0 7px 9px -7px #ccc;
        }
        &:last-child {
          border-bottom: 0;
        }
        a {
          font-size: 16px;
          font-weight: normal;
          color: $primary-font-color;
        }
        &:hover {
          background: $color-orange;
          a {
            color: #ffffff;
          }
          .sub-nav,
          .sub-nav:hover {
            display: block;
          }
        }
      }
    }
    li {
      margin: 0 15px;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
      &:hover .sub-nav,
      .sub-nav:hover {
        display: block;
      }
    }
    a.router-link-exact-active {
      color: $color-orange;
    }
  }
}

@media (max-width: 1000px) {
  header {
    padding: 20px 50px;
  }
}

@media (max-width: 700px) {
  header {
    flex-direction: column;
  }
  header h2 {
    margin-bottom: 15px;
  }
}

@media (max-width: 600px) {
  header {
    padding: 10px 50px;
    align-items: flex-start;
    min-height: 65px;
    h2 {
      margin-bottom: 0px;
    }
    nav {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 65px;
      left: 0;
      display: flex;
      flex-direction: column;
      background-color: #ffffff;
      z-index: 9;
      border-top: 1px solid $color-gray-light;
      &.hidden {
        display: none;
      }
      > li {
        padding: 0;
        margin: 0;
        border-bottom: 1px solid $color-gray-light;
        > a {
          display: block;
          margin: 0 25px;
          padding: 7px 0;
          i.fa {
            position: absolute;
            right: 10px;
            top: 10px;
            font-size: x-large;
            display: inline-block;
            z-index: 11;
          }
        }
        &:hover {
          .sub-nav,
          .sub-nav:hover {
            display: none;
          }
        }
        &.open {
          .sub-nav {
            display: block;
          }
          a {
            i.fa::before {
              content: '\F106';
            }
          }
        }
        a {
          i.fa:before {
            content: '\F107';
          }
        }
        .sub-nav {
          display: none;
          top: 0;
          left: 0;
          position: relative;
          padding-top: 0;
          background-color: #f3f3f3;
          li {
            width: 100%;
            padding: 7px 0;
            padding-left: 55px;
            box-shadow: none !important;
            border-top: 1px solid #ffffff;
            border-bottom: none;
            color: $color-gray-light;
          }
        }
      }
    }
    .menu-toggle {
      width: 25px;
      height: 30px;
      position: absolute;
      top: 20px;
      right: 25px;
      cursor: pointer;
      z-index: 10;
      .one,
      .two,
      .three {
        width: 100%;
        height: 4px;
        background-color: $color-blue;
        margin: 5px auto;
        backface-visibility: hidden;
        -moz-transition-duration: 0.3s;
        -o-transition-duration: 0.3s;
        -webkit-transition-duration: 0.3s;
        transition-duration: 0.3s;
      }
      &.on {
        .one {
          -moz-transform: rotate(45deg) translate(3px, 4px);
          -ms-transform: rotate(45deg) translate(3px, 4px);
          -webkit-transform: rotate(45deg) translate(3px, 4px);
          transform: rotate(45deg) translate(3px, 4px);
        }
        .two {
          opacity: 0;
        }
        .three {
          -moz-transform: rotate(-45deg) translate(9px, -10px);
          -ms-transform: rotate(-45deg) translate(9px, -10px);
          -webkit-transform: rotate(-45deg) translate(9px, -10px);
          transform: rotate(-45deg) translate(9px, -10px);
        }
      }
    }
  }
}
</style>
