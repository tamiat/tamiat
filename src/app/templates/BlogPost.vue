<template>
  <div>
    this is a blog post
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
