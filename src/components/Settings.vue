<template>
  <div class="container">

    <h3>General settings</h3>

    <div class="columns is-multiline">

      <div v-for="item in settings" class="column is-10 is-offset-1">
        <div class="field">
          <label class="label">{{item | capitalize}}</label>
          <div class="control">
            <input class="input" type="text" :placeholder="item">
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        settings: ['site name', 'site description']
      }
    },
    filters: {
      capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    }
  }

</script>

<style lang="scss" scoped>
  h3 {
    font-size: 1.7em;
    margin: 1em 0em;
  }

</style>
