<template>
  <aside class="menu sidebar" id="sidebar">

    <ul class="menu-list">
      <li v-for="(item, index) in menu" :key="index">
        <router-link :to="item.path" v-if="item.path">
          <span class="icon is-medium has-text-centered">
            <i :class="['fa', item.icon]"></i>
          </span>
          <p class="has-text-centered">
            {{ item.name }}
          </p>
        </router-link>
      </li>
    </ul>

  </aside>
</template>

<script>
export default {
  name: 'sidebar',
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
          name: 'Pages',
          path: '/admin/pages',
          icon: 'fa-archive'
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
$sidebarBg: #384A5C;
$sidebarColor: #B7B7B7;

#sidebar {
  position: fixed;
  top: 0px;
  left: 0;
  bottom: 0;
  padding: 20px 0 50px;
  width: 90px;
  min-width: 45px;
  max-height: 100vh;
  height: calc(100%);
  z-index: 1024 - 1;
  background: $sidebarBg;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 65px;

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
</style>
