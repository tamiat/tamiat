<template>
  <div class="container">

    <!-- users page title -->
    <div class="content-heading is-flex">
      <h3 class="is-size-3">Users</h3>
      <router-link to="/admin/users/new" class="button is-info">Add New</router-link>
    </div>

    <!-- the new user form loaded via vue loader -->
    <router-view></router-view>

    <!-- the users table -->
    <div class="box">
      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>name</th>
            <th>email</th>
            <th>role</th>
            <th>posts</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 6">
            <td>name</td>
            <td>email</td>
            <td>role</td>
            <td>posts</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
  export default {}

</script>

<style lang="scss" scoped>
  .content-heading {
    justify-content: baseline;
    align-content: center;
    align-items: center;
    h3 {
      margin: 1em 1em 1em 0em;
    }
  }

</style>
