<!-- for customizing tags it is recommended to use either Bulma.io classes or follow Bulma.io process for customization-->
<template>
  <div class="tags" v-if="contentTags.length != 0">
    <span v-for="(tag, tagIndex) in contentTags" :key="tagIndex" class="tag">{{tag}}</span>
  </div>
</template>
<script>
export default {
  props:{
    tags:{
      type:Array,
      required: true,
      default:() => {
        return []
      }
    }
  },
  computed:{
    contentTags: function() {
      return this.tags
    }
  }
}
</script>
<style lang="scss">
// here you can add custom styles for your field
</style>