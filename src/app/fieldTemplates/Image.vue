<template>
  <img :src="imageSrc || require('@/app/assets/img/coast.jpg')" :class="fieldClass"/>
</template>
<script>
export default {
  props:{
    src:'',
    fieldClass:''
  },
  computed:{
    imageSrc:function(){
     return this.src
    }
  }
}
</script>
<style lang="scss">
// here you can add custom styles for your field
</style>