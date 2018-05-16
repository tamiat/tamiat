<template>
  <!-- this is an example of a dynamic template. -->
  <!-- Your dynamic content is exposed as 'content' data property in the template. -->
  <div class="page-news">

    <app-header></app-header>

    <div class="clearfix news-content">
      <div class="leftbar">
        <img :src="content.img || require('../assets/img/coast.jpg')" class="responsive-image">

        <div class="news-preview-content">
          <h1 class="news-title" v-text="content.title"></h1>
          <p class="date" v-text="content.date"></p>

          <p class="subheadline" v-text="content.subheadline"></p>

          <div class="news-body" v-html="content.body"></div>

          <hr/>

          <div class="share-box">
            <h4 class="is-subheading">Share this:</h4>

            <ul>
              <li>
                <a href="#">
                  <img src="../assets/img/social-media/blue/facebook-blue.png" alt="facebook">
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="../assets/img/social-media/blue/twitter-blue.png" alt="twitter">
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="../assets/img/social-media/blue/pinterest-blue.png" alt="pinterest">
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="../assets/img/social-media/blue/instagram-blue.png" alt="pinterest">
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="rightbar">
        <div class="search-box form-icon-wrapper">
          <input @keydown.enter="search" v-model="searchQuery" class="form-control" placeholder="Search...">

          <button @click="search">
            <i class="fa fa-arrow-right"></i>
          </button>
        </div>

        <h3 class="is-subheading">Search By Topic</h3>

        <ul v-if="categories" class="topic-list">
          <li v-for="(count, category) in categories" :key="category">
            <router-link :to="`${getListingRoute()}?cat=${category.toLowerCase()}`">
              {{ category }} <span class="count">({{ count }})</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <app-footer></app-footer>
  </div>
</template>

<script>
import LoadContent from './LoadContent'
import appHeader from '../components/appHeader'
import appFooter from '../components/appFooter'
import _ from 'lodash'

export default {
  mixins: [LoadContent],
  components: {
    appHeader,
    appFooter
  },
  computed: {
    news () {
      const params = this.$route.params
      let path = this.$route.path
      if (params) {
        _.forIn(params, (value, key) => {
          path = path.replace(value, ':' + key)
        })
      }
      let currentRoute = this.routes.filter((route) => {
        return route.path === path
      })[0]

      return this.getContentsByType(currentRoute.contentType)
    },
    categories () {
      return _.countBy(this.news, 'category')
    }
  },
  data () {
    return {
      searchQuery: ''
    }
  },
  methods: {
    getListingRoute () {
      const params = this.$route.params
      let path = this.$route.path

      if (params) {
        _.forIn(params, (value, key) => {
          path = path.replace(`/${value}`, '')
        })
      }

      return path
    },
    search () {
      this.$router.replace({ path: this.getListingRoute(), query: { q: this.searchQuery } })
    }
  }
}
</script>

<style lang="scss">
@import '../styles/index.scss';

.page-news {
  .news-title {
    margin-bottom: 5px;
  }
  .date {
    margin-bottom: 20px;
  }
  .subheadline {
    font-weight: 700;
    margin-bottom: 25px;
  }
  hr {
    margin: 30px 0 15px 0;
  }
  .share-box {
    .is-subheading {
      font-size: 20px;
    }
    ul {
      display: flex;
      margin-top: 10px;
      li {
        display: inline-block;
        margin-right: 20px;
      }
    }
  }
  .search-box {
    margin-bottom: 25px;
  }
}
</style>
