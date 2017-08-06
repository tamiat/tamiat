<template>
  <div>
    <navbar></navbar>
    <sidebar></sidebar>
    <div class="wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Navbar from './components/Navbar'
  import Sidebar from './components/Sidebar'

  export default {
    components: {
      'navbar': Navbar,
      'sidebar': Sidebar
    }
  }

</script>

<style lang="scss" scoped>
  .wrapper {
    width: calc(100% - 200px);
    position: absolute;
    top: 52px;
    left: 190px;
  }

</style>
