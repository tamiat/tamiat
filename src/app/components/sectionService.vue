<template>
  <section class="features bg-blue">
    <div class="container">
      <h3 class="is-heading">Features and services</h3>
      <p class="info">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices. Morbi vitae pulvinar velit. Sed aliquam dictum sapien, id sagittis augue malesuada eu.</p>
      <ul class="grid" v-if="services">
        <li v-for="service in services" :key="service['.key']">
          <i v-if="service.icon" :class="service.icon"></i>
          <h4 v-text="service.title"></h4>
          <p v-text="service.description"></p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import contentFetch from '@/admin/mixins/contentFetch'
import { contentsRef } from '@/admin/firebase_config'

export default {
  name: 'section-service',
  mixins: [contentFetch],
  firebase: {
    contents: contentsRef
  },
  computed: {
    services () {
      return this.getContentsByType('Services')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/app/styles/index.scss';

/*----------------------
       Features Section
  ----------------------*/

.features {
  color: #ffffff;
  .is-heading {
    color: #ffffff;
  }
  .grid {
    padding-top: 50px;
    li {
      padding: 0 30px 10px 30px;
      flex-basis: 33%;
      text-align: left;
      i {
        font-size: 64px;
        margin-bottom: 25px;
      }
      h4 {
        font-size: 20px;
        margin-bottom: 25px;
      }
      p {
        margin: 0;
        text-align: left;
      }
    }
  }
}

@media (max-width: 1000px) {
  .features .grid li {
    flex-basis: 70%;
    margin-bottom: 65px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}

@media (max-width: 600px) {
  .features .grid li {
    flex-basis: 100%;
  }
}
</style>
