<template>
  <section class="reviews">
    <div class="container">
      <h3 class="is-heading is-orange">What Others Say</h3>

      <ul class="quote-box" v-if="reviews">
        <li v-for="review in reviews" :key="review['.key']">
          <p class="quote" v-text="review.description"></p>
          <img :src="review.img" :alt="review.author">
          <p class="author" v-text="review.author"></p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import contentFetch from '@/admin/mixins/contentFetch'
import { contentsRef } from '@/admin/firebase_config'

export default {
  name: 'section-review',
  mixins: [contentFetch],
  firebase: {
    contents: contentsRef
  },
  data () {
    return {
      img: '@/app/assets/img/hero.jpg'
    }
  },
  computed: {
    reviews () {
      return this.getContentsByType('Reviews')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/app/styles/index.scss';

/*--------------------
       Reviews Section
  --------------------*/

.reviews {
  background-color: #fff;
  ul.quote-box {
    display: flex;
    li {
      margin: 50px 30px;
      padding: 20px;
      width: 33.33%;
      @include border-radius(5px);
      box-shadow: 0px 0px 9px 0px lightgray;
      p {
        text-align: left;
      }
      p.quote {
        min-height: 180px;
        margin-bottom: 45px;
      }
      .author {
        color: #000000;
        font-weight: 700;
      }
    }
  }
}

@media (max-width: 1000px) {
  .reviews {
    .quote {
      font-size: 20px;
    }
    .author {
      font-size: 16px;
    }
  }
}

@media (max-width: 992px) {
  .reviews {
    ul.quote-box {
      display: block;
      li {
        width: 100%;
        display: block;
        float: none;
        margin: 0 0 30px 0;
        p.quote {
          min-height: auto;
        }
      }
    }
  }
}

@media (max-width: 600px) {
  .reviews ul.quote-box {
    li {
      .quote {
        font-size: 16px;
        line-height: 26px;
      }
    }
  }
}
</style>
