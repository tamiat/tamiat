<template>
  <nav class="navbar has-shadow">

    <!-- the navbar brand -->
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="../../assets/logo.png" alt="Tamiat CMS logo">
      </router-link>
      <div class="navbar-burger burger" data-target="navMenuExample">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <!-- the navbar right menu -->
    <div class="navbar-menu">
      <div class="navbar-end">
        <router-link class="navbar-item" to="/">
          login
        </router-link>
        <router-link class="navbar-item" to="/">
          logout
        </router-link>
      </div>
    </div>

  </nav>
</template>

<style>
  .navbar {
    position: fixed;
    z-index: 1024;
    width: 100%;
  }

</style>
