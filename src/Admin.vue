<template>
  <div>
    <navbar></navbar>
    <sidebar></sidebar>
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
