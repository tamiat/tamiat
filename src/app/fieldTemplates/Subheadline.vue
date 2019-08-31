<template>
  <p :class="fieldClass">{{contentSubHeadline}}</p>
</template>
<script>
export default {
  props: {
    subHeadline: '',
    fieldClass:''
  },
  computed: {
    contentSubHeadline: function() {
      return this.subHeadline
    }
  }
}
</script>
<style lang="scss">
// here you can add custom styles for your field
</style>