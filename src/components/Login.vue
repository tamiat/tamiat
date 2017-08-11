<template>
  <div class="container login">
    <div class="columns is-centered is-vertical-aligned is-fullheight is-flex">
      <div class="column box is-one-third">

        <!-- tamiat CMS logo -->
        <div class="columns is-flex is-centered is-mobile">
          <figure class="column is-half">
            <img src="../assets/logo.png" alt="Tamiat logo">
          </figure>
        </div>

        <!-- form fields -->
        <div v-for="field in fields" class="field columns">
          <div class="control column">
            <input :type="field.type" class="input" :name="field.label" :placeholder="field.label">
          </div>
        </div>

        <!-- submit button -->
        <button type="submit" class="button is-info is is-fullwidth">Login</button>
        <p>
          Don't have an account
          <router-link to="/signup">Sign Up</router-link>
        </p>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // All the fields required in the login page
        fields: [
          {
            label: 'username',
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
  html,
  body,
  #app {
    background-color: #F1F1F1;
  }

  .is-vertical-aligned {
    align-items: center;
  }

  .is-fullheight {
    height: 100vh;
  }

  .login>div {
    padding: 20px;
  }

  .login .box {
    padding: 20px 10px;
  }

  .login p {
    margin-top: 1em;
    font-size: 0.8em;
  }

</style>
