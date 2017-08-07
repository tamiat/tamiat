<template>
  <div class="new-user">

    <div class="box">
      <h4 class="is-size-4">New User</h4>
      <form class=" columns">

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
      <button type="submit" class="button is-info">Add</button>
      <router-link to="/admin/users" class="button is-danger">Cancel</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
