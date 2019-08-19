<template>
  <h2 :class="fieldClass">{{contentTitle}}</h2>
</template>
<script>
export default {
  props:{
    text: {
      type: String
    },
    fieldClass:''
  },
  computed:{
    contentTitle: function() {
      return this.text
    }
  }
}
</script>
<style lang="scss">
// here you can add custom styles for your field
</style>