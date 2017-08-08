<template>
  <div class="admin">
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

<style lang="scss">
  html,
  body,
  #app,
  .admin {
    background-color: #F1F1F1;
  }

  .wrapper {
    width: calc(100% - 200px);
    position: absolute;
    top: 52px;
    left: 190px;
    background-color: #F1F1F1;

    .content-heading {
      justify-content: baseline;
      align-content: center;
      align-items: center;
      h3 {
        margin: 1em 1em 1em 0em;
      }
    }
  }

</style>
