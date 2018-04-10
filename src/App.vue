<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="sass">

html,
body,
#app,
.admin
  font-family: sans-serif
  background-color: #F1F1F1
  height: 100%
  width: 100%
  margin: 0px
  padding: 0px

.bulma
  @import "../node_modules/bulma/bulma"
  *
    box-sizing: border-box

</style>
