<template>
  <div>
    this is template 2
    <span v-if="!content && routes.length > 0">{{onLoaded()}}</span>
    <h1>{{content.title}}</h1>
    <div v-html="content.body"></div>
  </div>
</template>

<script>
import { postsRef, routesRef } from '@/admin/firebase_config/index'
export default {
  data () {
    return {
      content: ''
    }
  },
  firebase: {
    routes: routesRef
  },
  methods: {
    onLoaded () {
      let filteredRoutes = this.routes.filter((route) => {
        return route.path === this.$route.path
      })
      let contentId = filteredRoutes[0].content
      this.getContentById(contentId)
    },
    getContentById (id) {
      if (id) {
        postsRef.child(id).on('value', (snapshot) => {
          this.content = snapshot.val()
        })
      }
    }
  }
}
</script>
