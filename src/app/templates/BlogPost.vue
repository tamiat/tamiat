<template>
  <!-- this is an example of a dynamic template. -->
  <!-- Your dynamic content is exposed as 'content' data property in the template. -->
  <div class="page-news">
    <app-header></app-header>
    <div class="container">
      <div class="clearfix news-content">
        <div class="leftbar">
          <div v-if="!currentContent" class="news-preview-content">
            <div class="news-body">Loading...</div>
          </div>
          <div v-else class="news-preview-content">
            <content-title :fieldClass="'news-title'" v-if="currentNews.title" :text="currentNews.title"/>
            
            <p class="date" v-text="currentNews.date"></p>
            <!-- Load default image if not available -->
            <content-image :src="currentNews.img" :fieldClass="'responsive-image'"/>

            <content-body v-if="currentNews.body" :fieldClass="'news-body'" :body="currentNews.body"/>

            <hr />
            <div class="share-box">
              <h4 class="is-subheading">Share this:</h4>
              <ul>
                <li>
                  <a href="#">
                    <img src="@/app/assets/img/social-media/blue/facebook-blue.png" alt="facebook">
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="@/app/assets/img/social-media/blue/twitter-blue.png" alt="twitter">
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="@/app/assets/img/social-media/blue/pinterest-blue.png" alt="pinterest">
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="@/app/assets/img/social-media/blue/instagram-blue.png" alt="pinterest">
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
    </div>

    <app-footer></app-footer>
  </div>
</template>

<script>
import LoadContent from './LoadContent'
import appHeader from '@/app/components/appHeader'
import Title from '@/app/fieldTemplates/Title.vue'
import Image from '@/app/fieldTemplates/Image.vue'
import Body from '@/app/fieldTemplates/Body.vue'
import appFooter from '@/app/components/appFooter'
import _ from 'lodash'

export default {
  mixins: [LoadContent],
  components: {
    appHeader,
    contentTitle: Title,
    contentImage: Image,
    contentBody: Body,
    appFooter
  },
  computed: {
    currentContent () {
      return this.content.filter(obj => {
        return obj['.key'] === this.$route.params.id || obj.slug === this.$route.params.id
      })[0]
    },
    categories () {
      return _.countBy(this.content, 'category')
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
@import '@/app/styles/index.scss';

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

@media (max-width: 768px) {
  .page-news {
    .rightbar {
      display: none;
    }
  }
}

@media (max-width: 600px) {
  .page-news {
    .search-box {
      margin: 10px 0;
      display: none;
    }
    .leftbar {
      margin-top: 10px;
    }
  }
}
</style>
