<template>
  <aside class="menu app-sidebar">

    <p class="menu-label">
      General
    </p>

    <ul class="menu-list">
      <li v-for="(item, index) in menu">
        <router-link :to="item.path" v-if="item.path">
          <span class="icon is-small"><i :class="['fa', item.icon]"></i></span> {{ item.name }}
        </router-link>
      </li>
    </ul>

  </aside>
</template>

<script>
  export default {

    data() {
      return {
        // this array contains the all the links in the sidebar
        menu: [
          {
            name: 'posts',
            path: '/admin/posts',
            icon: 'fa-file-text'
          },
          {
            name: 'users',
            path: '/admin/users',
            icon: 'fa-users'
          },
          {
            name: 'Settings',
            path: '/admin/settings',
            icon: 'fa-gear'
          },
        ]
      }
    }
  }

</script>

<style lang="scss">
  .app-sidebar {
    position: fixed;
    top: 54px;
    left: 0;
    bottom: 0;
    padding: 20px 0 50px;
    width: 180px;
    min-width: 45px;
    max-height: 100vh;
    height: calc(100% - 50px);
    z-index: 1024 - 1;
    background: #FFF;
    box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
    overflow-y: auto;
    overflow-x: hidden;

    .menu-label {
      padding-left: 5px;
    }
  }

</style>
