<template>
  <v-navigation-drawer app fixed permanent class="blue darken-1">
    <v-toolbar flat class="blue darken-1">
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title white--text">
            Dashboard
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider class="white mb-3"></v-divider>
    <v-list class="pt-0">
      <v-list-tile v-for="item in navItems" :key="item.title"
        @click="$router.push({ path: item.path })"
        :class="{ 'blue darken-2': $route.path === item.path }">
        <v-list-tile-action>
          <v-icon class="white--text">{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="white--text">{{ item.name }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      navItems: [
        {
          name: 'Posts',
          path: '/admin/posts',
          icon: 'border_color'
        },
        {
          name: 'Pages',
          path: '/admin/pages',
          icon: 'folder'
        },
        {
          name: 'Media',
          path: '/admin/media',
          icon: 'add_a_photo'
        },
        {
          name: 'Settings',
          path: '/admin/settings',
          icon: 'settings'
        }
      ]
    }
  }
}

</script>

<style lang="scss" scoped>
</style>
