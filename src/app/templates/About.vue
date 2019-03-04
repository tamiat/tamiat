<template>
  <!-- this is an example of a static template. No dynamic content here -->
  <div class="template">
    <h1>About us</h1>
    <p>{{ textarea1 }}</p>
    <p>{{ textarea2 }}</p>
  </div>
</template>

<script>
import LoadContent from './LoadContent'
export default {
  mixins: [LoadContent],
  data () {
    return {}
  },
  computed: {
    currentContent () {
      return this.content.filter(obj => {
        return obj['.key'] === this.$route.params.id || obj.slug === this.$route.params.id
      })[0]
    },
    textarea1 () {
      return this.currentContent['textarea']
    },
    textarea2 () {
      return this.currentContent['2textarea']
    }
  },
  methods: {}
}
</script>

<style lang="scss">
@import '@/app/styles/index.scss';
</style>
