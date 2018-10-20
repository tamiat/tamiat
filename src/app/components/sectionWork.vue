<template>
  <section class="our-work">
    <div class="container">
      <h3 class="is-heading">Some of our work</h3>
      <p class="info">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices. Morbi vitae pulvinar velit. Sed aliquam dictum sapien, id sagittis augue malesuada eu.</p>
      <ul class="grid" v-if="works">
        <li v-for="work in works" :key="work['.key']" class="small" :style="{'background-image': `url(${work.img})`}"></li>
      </ul>
    </div>
  </section>
</template>

<script>
import contentFetch from '@/admin/mixins/contentFetch'
import { contentsRef } from '@/admin/firebase_config'

export default {
  name: 'section-work',
  mixins: [contentFetch],
  firebase: {
    contents: contentsRef
  },
  computed: {
    works () {
      return this.getContentsByType('Works')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/app/styles/index.scss';

/*--------------------
       Our Work Section
  ---------------------*/

.our-work {
  background-color: #fff;
  .is-heading {
    color: $color-orange;
  }
  .grid {
    padding: 60px 0 20px 0;
    li {
      padding: 10px;
      height: 350px;
      border-radius: 3px;
      background-clip: content-box;
      background-size: cover;
      background-position: center;
      background-color: #333;
      &.small {
        flex-basis: 40%;
      }
      &.large {
        flex-basis: 60%;
      }
    }
  }
}

@media (max-width: 1000px) {
  .our-work .grid li.small,
  .our-work .grid li.large {
    flex-basis: 100%;
  }
}

@media (max-width: 600px) {
  .our-work {
    .grid {
      padding: 30px 0;
      li.small,
      li.large {
        padding: 10px 0;
      }
    }
  }
}
</style>
