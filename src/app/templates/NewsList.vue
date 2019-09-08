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
            <div v-if="loaded === false">
              <h4>Loading News.. Please wait..</h4>
            </div>
            <div v-else-if="currentPageNews && currentPageNews.length > 0">
              <div v-for="newsItem in currentPageNews" :key="newsItem['.key']" class="news">
                <content-image :src="newsItem.img" :fieldClass="'responsive-image'"/>
                <div class="news-preview-content">
                  <content-title :fieldClass="'news-title'" v-if="newsItem.title" :text="newsItem.title"/>
                  <content-tags :tags="newsItem.tags" />
                  <content-body v-if="newsItem.body" :fieldClass="'news-body'" :body="newsItem.body"/>
                  <router-link :to="$route.path + '/' + (newsItem.slug ? newsItem.slug : newsItem['.key'])" class="btn is-small">Read more</router-link>
                  <content-categories :categories="newsItem.category.options" />
                </div>
              </div>

              <pagination :totalItems="filteredNews.length" :perPage="perPage" :currentPage="filter.currentPage" @changePage="changePage">
              </pagination>
            </div>
            <div v-else>
              No News Found
            </div>
          </div>

          <div class="rightbar">
            <div class="level">
              <h3 class="is-subheading level-left">Search By Topic</h3>
              <a @click="clearCategories()" class="button is-info is-outlined level-right" style="padding:10px">Clear</a>
            </div>
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
import appHeader from '@/app/components/appHeader'
import appFooter from '@/app/components/appFooter'
import pagination from '@/app/components/pagination'
import Body from '@/app/fieldTemplates/Body.vue'
import Title from '@/app/fieldTemplates/Title.vue'
import Image from '@/app/fieldTemplates/Image.vue'
import Tags from '@/app/fieldTemplates/Tags.vue'
import Categories from '@/app/fieldTemplates/Categories.vue'
import { contentsRef, routesRef } from '@/admin/firebase_config/index'
import contentFetch from '@/admin/mixins/contentFetch'
import categoryFilter from '@/admin/mixins/categoryFilter'
import _ from 'lodash'

const stringContains = (search, stringArr) => {
  let strContains = false
  stringArr.forEach(string => {
    if (string.toLowerCase().includes(search.toLowerCase())) strContains = true
  })
  return strContains
}

export default {
  mixins: [contentFetch, categoryFilter],
  components: {
    appHeader,
    appFooter,
    pagination,
    contentBody: Body,
    contentTitle: Title,
    contentImage: Image,
    contentTags: Tags,
    contentCategories: Categories
  },
  firebase: {
    routes: routesRef,
    contents: {
      source: contentsRef,
      readyCallback: function () {
        this.loaded = true
      }
    }
  },
  data () {
    return {
      filter: {
        category: undefined,
        q: undefined,
        currentPage: 1
      },
      searchQuery: undefined,
      perPage: 4, // No of news per page
      loaded: false
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
   
    filteredNews () {
      const searchQuery = this.filter.q
      const category = this.filter.category

      return _.filter(this.news, function (o) {
        return (!searchQuery || (stringContains(searchQuery, o.title) || stringContains(searchQuery, o.subheadline))) &&
               (!category || (stringContains(category, o.category.options)))
      })
    },
    currentPageNews () {
      let pageNumber = Math.floor(this.filteredNews.length / this.perPage)
      let lastPageContentNum
      if (this.filteredNews.length % this.perPage !== 0) {
        lastPageContentNum = this.filteredNews.length % this.perPage
        pageNumber += 1
      }
      if(this.filter.currentPage === 1) {
        return _.slice(this.filteredNews, this.filter.currentPage - 1, ((this.filter.currentPage - 1) + this.perPage))
      } else if (this.filter.currentPage === pageNumber && lastPageContentNum) {
        return _.slice(this.filteredNews, ((this.filter.currentPage -1) * this.perPage), (((this.filter.currentPage -1) * this.perPage)) + lastPageContentNum)
      } else {
        return _.slice(this.filteredNews, (this.filter.currentPage - 1) * this.perPage, (((this.filter.currentPage - 1) * this.perPage) + this.perPage))
      }
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
    },
    clearCategories () {
      this.filter.category = undefined
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/app/styles/index.scss';
</style>