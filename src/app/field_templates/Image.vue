<template>
  <img :src="imageSrc" :class="field_class"/>
</template>
<script>
export default {
  props:{
    src:'',
    field_class:''
  },
  computed:{
    imageSrc:function(){
      let providedSrc = this.src === '' ? '@/app/assets/img/coast.jpg' : this.src
      return providedSrc
    }
  }
}
</script>
<style lang="scss">
// here you can add custom styles for your field
</style>