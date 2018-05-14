<template>
  <!-- this is an example of a dynamic template. -->
  <!-- Your dynamic content is exposed as 'content' data property in the template. -->
  <div class="template">
    <h1>{{content.title}}</h1>
    <div v-html="content.body"></div>
  </div>
</template>

<script>
import LoadContent from './LoadContent'
export default {
  mixins: [LoadContent]
}
</script>

<style lang="scss">
@import '../styles/index.scss';
</style>
