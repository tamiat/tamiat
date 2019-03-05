<template>
  <!-- this is an example of a static template. No dynamic content here -->
  <div class="template">
    <h1>About us</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, corporis alias ullam fugiat fuga laudantium, provident omnis aperiam voluptatum reprehenderit, accusamus a magni! Velit obcaecati quidem, similique nulla adipisci sapiente!</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, corporis alias ullam fugiat fuga laudantium, provident omnis aperiam voluptatum reprehenderit, accusamus a magni! Velit obcaecati quidem, similique nulla adipisci sapiente!</p>
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
      // filters content arr and returns content that attached to this route
      return this.content.filter(obj => { return obj['.key'] === this.routes.find(this.isCurrentPath)['content'] })[0]
    }
  },
  methods: {
    // function for find - returns element if it has similar route
    isCurrentPath: function (element) {
      if (element.path === this.$router.currentRoute.path) return element
    }
  }
}
</script>

<style lang="scss">
@import '@/app/styles/index.scss';
</style>
