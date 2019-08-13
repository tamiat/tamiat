<template>
  <ul v-if="contentCategoryes.options">
    <li v-for="(option, index) in contentCategoryes.options" :key="index">{{option}}</li>
  </ul>
</template>
<script>
export default {
  props: {
    categories:{
      type:Object
    }
  },
  computed:{
    contentCategoryes: function() {
      return this.categories
    }
  }
}
</script>
<style lang="scss">
// here you can add custom styles for your field
</style>