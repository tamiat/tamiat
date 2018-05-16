<template>
  <div class="page-news-list">
    <app-header></app-header>

    <div class="news-list">
      <div class="container">
        <div class="clearfix">
          <div class="leftbar">
            <h2 class="is-heading">Latest News Entries</h2>
          </div>

          <div class="rightbar">
            <div class="search-box form-icon-wrapper">
              <input @keydown.enter="search" v-model="searchQuery" class="form-control" placeholder="Search...">

              <button @click="search">
                <i class="fa fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="clearfix news-listing-box">
          <div class="leftbar">
            <div v-if="currentPageNews && currentPageNews.length > 0">
              <div v-for="newsItem in currentPageNews" :key="newsItem['.key']" class="news">
                <img :src="newsItem.img || require('../assets/img/coast.jpg')" class="responsive-image">
                <div class="news-preview-content">
                  <h2 class="news-title" v-if="newsItem.title" v-text="newsItem.title"></h2>
                  <p v-if="newsItem.subheadline" v-text="newsItem.subheadline"></p>
                  <router-link :to="$route.path + '/' + newsItem['.key']" class="btn is-small">Read more</router-link>
                </div>
              </div>

              <pagination :totalItems="filteredNews.length"
                          :perPage="perPage"
                          :currentPage="filter.currentPage"
                          @changePage="changePage">
              </pagination>
            </div>
            <div v-else>
              No News Found
            </div>
          </div>
          <div class="rightbar">
            <h3 class="is-subheading">Search By Topic</h3>

            <ul v-if="categories" class="topic-list">
              <li v-for="(count, category) in categories" :key="category">
                <a @click="changeCategory(category)">{{ category }} <span class="count">({{ count }})</span></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <app-footer></app-footer>
  </div>
</template>

<script>
import appHeader from '../components/appHeader'
import appFooter from '../components/appFooter'
import pagination from '../components/pagination'
import { contentsRef, routesRef } from '@/admin/firebase_config/index'
import contentFetch from '@/admin/mixins/contentFetch'
import _ from 'lodash'

const stringContains = (serach, string) => {
  return string.toLowerCase().includes(serach.toLowerCase())
}

export default {
  mixins: [contentFetch],
  components: {
    appHeader,
    appFooter,
    pagination
  },
  firebase: {
    routes: routesRef,
    contents: contentsRef
  },
  data () {
    return {
      filter: {
        category: undefined,
        q: undefined,
        currentPage: 1
      },
      searchQuery: undefined,
      perPage: 1 // No of news per page
    }
  },
  watch: {
    // Update routes whenenver any filter paramters change
    filter: {
      handler: function () {
        this.updateRoute()
      },
      deep: true
    }
  },
  computed: {
    news () {
      let currentRoute = this.routes.filter((route) => {
        return route.path === this.$route.path
      })[0]

      return this.getContentsByType(currentRoute.contentType)
    },
    filteredNews () {
      const searchQuery = this.filter.q
      const category = this.filter.category

      return _.filter(this.news, function (o) {
        return (!searchQuery && !category) ||
          (
            (!searchQuery || (stringContains(searchQuery, o.title) || stringContains(searchQuery, o.subheadline))) &&
            (!category || (stringContains(category, o.category)))
          )
      })
    },
    currentPageNews () {
      return _.slice(this.filteredNews, this.filter.currentPage - 1, (this.filter.currentPage - 1) + this.perPage)
    },
    categories () {
      return _.countBy(this.news, 'category')
    },
    query () {
      return this.$route.query
    }
  },
  mounted () {
    this.filter.currentPage = parseInt(_.get(this.query, 'page', 1))
    this.filter.category = _.get(this.query, 'category')
    this.filter.q = _.get(this.query, 'q')
  },
  methods: {
    search () {
      this.filter.q = this.searchQuery
    },
    changeCategory (category) {
      this.filter.currentPage = 1
      this.filter.category = category.toLowerCase()
    },
    changePage (toPage) {
      this.filter.currentPage = toPage
    },
    updateRoute () {
      this.$router.replace({ query: { q: this.filter.q, category: this.filter.category, page: this.filter.currentPage } })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>
