<template>
  <v-navigation-drawer app fixed permanent>
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            Dashboard
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list class="pt-0">
      <v-list-tile v-for="item in navItems" :key="item.title"
        @click="$router.push({ path: item.path })"
        :class="{ 'grey lighten-2': $route.path === item.path }">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.name }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-footer absolute bottom>
      <p>Some text</p>
    </v-footer>
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
