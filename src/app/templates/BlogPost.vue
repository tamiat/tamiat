<template>
  <!-- this is an example of a dynamic template. -->
  <!-- Your dynamic content is exposed as 'content' data property in the template. -->
  <div class="template">
    <h1>{{content.title}}</h1>
    <div v-html="content.body"></div>

    <!-- keep the next line if this template accept dynamic content -->
    <span v-if="!content && routes.length > 0">{{onLoaded()}}</span>
  </div>
</template>

<script>
import LoadContent from './LoadContent'
export default {
  mixins: [LoadContent]
}
</script>

<style lang="sass">
@import '../styles/index.sass'
</style>
