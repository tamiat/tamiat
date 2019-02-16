<template>
  <div class="menu sidebar is-hidden-mobile" id="sidebar">
    <ul class="sidebar-menu-list">

      <router-link v-for="item in menu" :key="item.index" tag="li" :to="item.path" class="menu-item">
        <div class="icon is-medium">
          <i :class="['fa', item.icon]"></i>
        </div>
        <div>{{ item.name }}</div>

        <!-- drop down menu -->
        <ul class="menu-item-dropdown" v-if="item.dropdown && contents">
          <router-link v-for="content in contents" :key="content['.key']" tag="li" :to="'/admin/content/' + content['.key']">
            <div>
              {{ content.name }}
            </div>
          </router-link>
          <router-link :to="item.dropdown[0].path" tag="li">
            {{item.dropdown.path}}
            <div>
              {{ item.dropdown[0].name }}
            </div>
          </router-link>
        </ul>
      </router-link>
      <a target="_blank" :href="helpbtn.path" class="menu-item">

        <div class="icon is-medium">
          <i :class="['fa', helpbtn.icon]"></i>
        </div>

        <div>{{ helpbtn.name }}</div>
      </a>

    </ul>
  </div>
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
      menu: [
        {
          name: 'Content',
          path: '/admin/content',
          icon: 'fa-wrench',
          dropdown: [
            {
              name: 'New/Edit content',
              path: '/admin/content',
              icon: 'fa-file-text',
              supports: null
            }
          ]
        },
        {
          name: 'Routing',
          path: '/admin/routing',
          icon: 'fa-random'
        },
        {
          name: 'Media',
          path: '/admin/media',
          icon: 'fa-picture-o'
        },
        {
          name: 'Database',
          path: '/admin/database',
          icon: 'fa-database'
        },
        {
          name: 'Settings',
          path: '/admin/settings',
          icon: 'fa-gear'
        }
      ],
      helpbtn: {
        name: 'Help',
        path: 'https://github.com/tamiat/tamiat/blob/master/README.md',
        icon: 'fa-question'
      }
    }
  }
}

</script>

<style lang="scss">
$sidebarBg: #4cb986;
$sidebarColor: #3b9169;
$sidebarWidth: 115px;

#sidebar {
  width: $sidebarWidth;
  min-width: 45px;
  z-index: 1024 - 1;
  background: $sidebarBg;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);

  .sidebar-menu-list {
    padding-bottom: 80px;

  }

  li,
  a {
    display: block;
    text-align: center;
    border-bottom: 1px solid #3b9169;
    padding-bottom: 4px;
    color: $sidebarColor;
    padding: 15px 0px;
    position: relative;
    cursor: pointer;

    &:hover {
      background: $sidebarBg;
      color: white;

      & .menu-item-dropdown {
        display: block;
      }
    }
  }

  .menu-item.router-link-active {
    background: $sidebarColor;
    color: $sidebarBg;
  }

  .menu-item-dropdown {
    display: none;
    position: absolute;
    background: $sidebarBg;
    left: $sidebarWidth;
    top: 0px;

    & li {
      padding: 15px;
    }

    & li.router-link-exact-active {
      background: $sidebarColor;
      color: $sidebarBg;
    }
  }

  .icon {
    font-size: 32px;
    margin-bottom: 5px;
  }
}
</style>
