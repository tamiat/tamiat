<template>
  <aside class="menu sidebar" id="sidebar">

    <ul class="menu-list">
      <li v-for="(item, index) in menu" :key="index">
        <router-link :to="item.path" v-if="item.path">
          <span class="icon is-medium has-text-centered">
            <i :class="['fa', item.icon]"></i>
          </span>
          <div class="has-text-centered">
            <span> {{ item.name }} </span>
          </div>
        </router-link>
      </li>
      <li class="menu--item"  v-for="menuItem in menuItems" :key="menuItem.index">
        <router-link :to="menuItem.path" v-if="menuItem.path">
          <span class="icon is-medium has-text-centered">
            <i :class="['fa', menuItem.icon]"></i>
          </span>
          <div class="has-text-centered">
            <span>{{ menuItem.name }} </span>
          </div>
          <ul class="menu--item-dropdown" v-if="contents">
            <li v-for="(dropdownItem, dropdownItemKey) in contents" :key="dropdownItemKey">
              <router-link :to="dropdownItem.path">
                <div class="has-text-centered">
                  {{ dropdownItem.name }}
                </div>
              </router-link>
            </li>
          </ul>
        </router-link>
      </li>
    </ul>

  </aside>
</template>

<script>
import { contentsRef } from '@/admin/firebase_config'
export default {
  name: 'sidebar',
  firebase: {
    contents: contentsRef
  },
  data () {
    return {
      // this array contains the all the links in the sidebar
      loaded: true,
      // menuitems: [],
      menu: [
        {
          name: 'Posts',
          path: '/admin/posts',
          icon: 'fa-file-text'
        },
        {
          name: 'Pages',
          path: '/admin/pages',
          icon: 'fa-archive'
        },
        {
          name: 'Media',
          path: '/admin/media',
          icon: 'fa-picture-o'
        },
        {
          name: 'Settings',
          path: '/admin/settings',
          icon: 'fa-gear'
        },
        {
          name: 'Database',
          path: '/admin/database',
          icon: 'fa-database'
        }
      ]
    }
  },
  computed: {
    menuItems () {
      return this.$store.getters.menuItems
    }
  }
}

</script>

<style lang="scss">
$sidebarBg: #384A5C;
$sidebarColor: #B7B7B7;

#sidebar {
  position: absolute;
  top: 0px;
  left: 0;
  bottom: 0;
  padding: 20px 0 50px;
  width: 115px;
  min-width: 45px;
  max-height: 100vh;
  height: calc(100%);
  z-index: 1024 - 1;
  background: $sidebarBg;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
  // overflow: auto;
  padding-top: 65px;
  &:after {
    content: '';
    display: block;
    width: 115px;
    position: fixed;
    height: 100vh;
    bottom: 0;
    left: 0;
    z-index: -1;
    background: $sidebarBg;
  }
  .menu-list {
    padding-bottom: 80px;
  }
  .menu-label {
    padding-left: 5px;
  }

  a {
    color: $sidebarColor;
    border-radius: 0px;
    padding: 15px 0px;

    &:hover {
      background: $sidebarBg;
      color: white;
    }
  }

  .has-text-centered {
    display: block !important;
    width: 100% !important;
    text-align: center !important;
  }
}

.menu {
  &--item {
    position: relative;
    &:hover {
      .menu--item-dropdown {
        display: block;
      }
    }
    &-dropdown {
      display: none;
      margin: 0 !important;
      position: absolute;
      top: 0%;
      right: 0;
      transform: translateX(100%);
      padding: 0 !important;
      background: #384a5c;
      &, & * {
        border: none !important;
      }
      li {
        min-width: 140px;
        &:first-child {
          a {
            padding-top: 18px !important;
          }
        }
        &:last-child {
           border-top: 1px solid rgba(white, 0.1) !important;
          a {
            padding-bottom: 18px !important;
          }
        }
        a {
          display: block;
          padding: 12px 20px !important;
        }
      }
    }
  }
}
</style>
