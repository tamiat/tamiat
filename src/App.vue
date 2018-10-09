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

<style lang="scss">
html, body,
#admin {
  font-family: sans-serif;
  background-color: #F1F1F1;
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;

  .bulma {
    // we are not changing anything currenly. If need to customize then import bulma sass.
    @import "../node_modules/bulma/css/bulma";
    * {
      box-sizing: border-box;
    }
  }
}
</style>
