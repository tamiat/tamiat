<template>
  <div class="new-user box">

    <h4 class="is-size-4">New User</h4>
    <form class=" columns">

      <!-- the new user required fields -->
      <div class="column is-two-thirds">
        <div v-for="field in fields" class="field columns">
          <div class="column">
            <label class="label is-capitalized">{{field.label}}</label>
          </div>
          <div class="control column">
            <input :type="field.type" class="input" :name="field.label">
          </div>
        </div>
      </div>

      <!-- the new user role -->
      <div class="field column is-one-third">
        <label class="label">The New User Role:</label>
        <label class="is-block">
          <input type="radio" name="role" value="admin"> Administrator
        </label>
        <label class="is-block">
          <input type="radio" name="role" value="admin"> Editor
        </label>
        <label class="is-block">
          <input type="radio" name="role" value="admin"> User
        </label>
      </div>

    </form>

    <!-- the form buttons -->
    <button type="submit" class="button is-info">Add</button>
    <router-link to="/admin/users" class="button is-danger">Cancel</router-link>
  </div>
</template>

<script>
  export default {
    name: 'user-new',
    data() {
      return {
        // this array contains all the required fields to add a new user
        fields: [
          {
            label: 'username',
            type: 'text'
          },
          {
            label: 'email',
            type: 'text'
          },
          {
            label: 'first name',
            type: 'text'
          },
          {
            label: 'last name',
            type: 'text'
          },
          {
            label: 'password',
            type: 'password'
          },
        ]
      }
    }
  }

</script>

<style>
  .new-user,
  h4 {
    margin-bottom: 1em;
  }

</style>
