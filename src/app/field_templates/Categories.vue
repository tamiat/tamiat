<template>
  <div v-if="contentCategories" class="categories buttons is-pulled-right">
    <span v-for="(option, index) in contentCategories" :key="index" class="button">{{option}}</span>
  </div>
</template>
<script>
export default {
  props: {
    categories:{
      type:Array
    },
    field_class:''
  },
  computed:{
    contentCategories: function() {
      return this.categories
    }
  }
}
</script>
<style lang="scss">
// here you can add custom styles for your field
</style>