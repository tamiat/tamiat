<template>
  <p v-html="contentBody" :class="field_class"></p>
</template>
<script>
export default {
  props: {
    body: '',
    field_class:''
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