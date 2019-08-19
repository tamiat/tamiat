<template>
  <p v-html="contentBody" :class="fieldClass"></p>
</template>
<script>
export default {
  props: {
    body: '',
    fieldClass:''
  },
  computed: {
    contentBody: function() {
      return this.body
    }
  }
}
</script>
<style lang="scss">
// here you can add custom styles for your field
</style>