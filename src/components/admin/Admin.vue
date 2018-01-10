<template>
  <div>
    <sidebar></sidebar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import Sidebar from '../sidebar/Sidebar'


export default {
  components: { Sidebar }
}

</script>

<style lang="scss" scoped>
</style>
