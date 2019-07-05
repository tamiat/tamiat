<template>
  <div class="container posts" id="posts" v-if="loaded">

    <!-- Page title -->
    <div class="content-heading is-flex">
      <h3 class="is-size-3">{{ content.name }}</h3>
      <router-link :to="'/admin/content/' + $route.params.key + '/new'" class="button is-info">Add New</router-link>
    </div>

    <!-- notification -->
    <transition mode="out-in" name="fade">
      <div v-if="notification.message" :class="'notification is-' + notification.type">
        <button class="delete" @click="hideNotifications"></button>{{notification.message}}
      </div>
    </transition>

    <!-- modal for post delete -->
    <transition mode="out-in" name="fade">
      <modal @close="showModal = false" :kind="kind" @confirmDeleteContent='confirmDeleteContent()' @selectBulkActions='selectBulkActions()' v-if="showModal" :header="header" />
    </transition>

    <!-- New content form loaded via router -->
    <router-view :add-content="addContent" :fields="content.fields" :update-content="updateContent" :contents="contentData" :key="$route.name + ($route.params.key || '')"></router-view>

    <!-- Search contents -->
    <div class="field is-grouped">
      <p class="control is-expanded">
        <input class="input" type="text" :placeholder="'Find ' + content.name + '...'"> <!--  v-model="searchPost" -->
      </p>
      <p class="control">
        <a class="button is-info">
          Search
        </a>
      </p>
    </div>

    <!-- States -->
    <div class="filters">
      <div class="states">
        <a class="state" @click="selectedState = 'all'" :class="{ 'activeState': selectedState === 'all' }">
          All<span class="stateCnt">({{ allContents }})</span>
        </a>|
        <a class="state" @click="selectedState = 'published'" :class="{ 'activeState': selectedState === 'published' }">
          Published<span class="stateCnt">({{ publishedContent.length}})</span>
        </a>|
        <a class="state" @click="selectedState = 'saved'" :class="{ 'activeState': selectedState === 'saved' }">
          Saved<span class="stateCnt">({{ savedContent.length}})</span>
        </a>
      </div>
      <!-- Dropdown filters -->
      <div>
        <!-- Categories
        <dropdown :options="postsList" :selectedElement="params.category" />-->
        <!-- Bulk actions -->
        <dropdown :options="bulkActions" :selectedElement="params.bulkAction" @selectBulkActions="selectBulkActions()" @bulkDelete="bulkDelete()" />
      </div>
    </div>

    <!-- Contents list -->
    <div class="box">
      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>
              Created
              <span class="icon">
                <i :class="{ 'fa fa-sort-down': !sortOptions.created.reverse, 'fa fa-sort-up': sortOptions.created.reverse }"></i>
              </span>
            </th>
            <th v-for="(field, fieldKey) in content.fields" :key="fieldKey" v-if="findField(field.name)">
              {{ field.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(contentInstance, index) in filteredContent" :key="index">
            <td class="post-title-cell">
              <checkbox v-model="contentInstance.selected" />
              {{ formatDate(contentInstance.created) }}
              <div class="actions">
                <router-link :to="'/admin/content/' + $route.params.key + '/edit/' + contentInstance['.key']">
                  <span class="has-text-info">Edit</span>
                </router-link>
                <span @click="deleteContent(contentInstance)" class="has-text-danger">Delete</span>
              </div>
            </td>
            <td class="post-title-cell" v-for="(field, fieldKey) in contentFields" :key="fieldKey" v-if="findField(field.name)">
              <!-- formatting how each field type is displayed -->
              <figure class="websiteLogo" v-if="findFieldType(field.name) === 'image'">
                <img :src="filteredContent[index][field.name]" alt="logo" style="max-height: 80px;">
              </figure>
              <span v-else-if="findFieldType(field.name) === 'textbox' ">{{ filteredContent[index][field.name] }}</span>
              <span v-else-if="findFieldType(field.name) === 'boolean'" class="tag is-info pointer">{{ filteredContent[index][field.name] }}</span>
              <a v-else-if="findFieldType(field.name) === 'url'" :href="filteredContent[index][field.name].link">{{ filteredContent[index][field.name].name }}</a>
              <span v-else-if="findFieldType(field.name) === 'tags'" v-for="tag in filteredContent[index][field.name]" class="tag is-info pointer">{{ tag }}</span>
              <span v-else-if="findFieldType(field.name) === 'select'" class="tag is-primary" > {{ filteredContent[index][field.name].selected }}</span>
              <input v-else-if="findFieldType(field.name) === 'integer'" type="number" :value="filteredContent[index][field.name]" class="input" readonly/>
              <p v-else>{{ field }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { contentsRef, db } from '@/admin/firebase_config'
import notifier from '@/admin/mixins/notifier'
import modal from '@/admin/components/shared/Modal'
import dropdown from '@/admin/components/shared/Dropdown'
import checkbox from '@/admin/components/shared/Checkbox'
import contentFilters from '@/admin/mixins/contentFilters'
import _ from 'lodash'

export default {
  name: 'contents',
  data () {
    return {
      content: null,
      // contentData: [],
      selContent: null,
      showModal: false,
      header: '',
      kind: '',
      sortKey: 'tittle',
      loaded: false,
    }
  },
  firebase: {
    contents: contentsRef
  },
  mixins: [notifier, contentFilters],
  created () {
    contentsRef.once('value',snapshot => {
      this.content = Object.assign(
        {},
        (this.contents.filter((content) => {
          return (content['.key'] === this.$route.params.key)
        }))[0]
      )
    })
    
    this.$bindAsArray('contentData', db.ref('contents/' + this.$route.params.key + '/data'))

    this.loaded = true
  },
  computed: {
    allContents () {
      return this.contentData.length
    },
    savedContent () {
      return this.contentData
        .filter(content => {
          if (content.state === 'saved') {
            return true
          }
        })
    },
    publishedContent () {
      return this.contentData
        .filter(content => {
          if (content.state === 'published') {
            return true
          }
        })
    },
    contentFields () {  //must order by content.fields since data in each instance of content.data is ordered by alphabet and not by field order set for that content type
      return this.content.fields
    }
  },
  methods: {
    findField (field) {
      for (var key in this.content.fields) {
        if (this.content.fields[key].name.toLowerCase() === field.toLowerCase()) {
          if (this.content.fields[key].listable) {
            return true
          }
        }
      }
      return false
    },
    findFieldType (field) {
      let fieldtype = ''
      this.content.fields.forEach(e => {
        fieldtype = e.name === field ? e.type : fieldtype
      })
      return fieldtype
    },
    formatDate (epoch) {  
      if (!epoch) return // if no time return nothing            
      return moment(epoch).format('MM/DD/YY | hh:mm')
    },
    addContent (content) {
      if (this.content.slug) {
        content.slug = this.slugify(content[this.content.slug])
      }

      this.$firebaseRefs.contents.child(this.$route.params.key + '/data')
        .push(content)
        .then(() => {
          this.showNotification('success', 'Content added successfully')
        })
    },
    deleteContent (content) {
      // delete content form firebase
      this.header = 'Are you sure you want to delete this content?'
      this.kind = 'deleteContent'
      this.showModal = true
      this.selContent = content
    },
    bulkDelete () {
      if (this.selectedContent.length) {
        this.header = 'Are you sure you want to delete selected contents?'
        this.kind = 'bulkDeleteSelected'
        this.showModal = true
      }
    },
    confirmDeleteContent () {
      this.$firebaseRefs.contents.child(this.$route.params.key + '/data').child(this.selContent['.key']).remove()
        .then(() => {
          this.showNotification('success', 'Content deleted successfully')
          this.showModal = false
          this.selContent = ''
        })
    },
    updateContent (content) {
      // create a copy of the item
      let tempCon = { ...content }
      if (this.content.slug) {
        tempCon.slug = this.slugify(tempCon[this.content.slug])
      }
      // remove the .key attribute
      delete tempCon['.key']
      this.$firebaseRefs.contents.child(this.$route.params.key + '/data').child(content['.key']).set(tempCon)
        .then(() => {
          if (content.state === 'saved') {
            this.showNotification('success', 'Content updated successfully')
          }
          if (content.state === 'published') {
            this.showNotification('success', 'Content updated and published successfully')
          }
        })
    },
    slugify (str) {
      if (!_.isString(str)) return ''
      str = str.toLowerCase()
      str = str.split(/ /).join('-')
      str = str.split(/\t/).join('--')
      str = str.split(/[|$&`~=\\/@+*!?({[\]})<>=.,;:'"^]/).join('')
      return str
    }
  },
  components: {
    modal,
    dropdown,
    checkbox
  }
}

</script>

<style lang="scss">
#posts {
  .post-title-cell {
    width: 30%;
  }
  .post-category-cell {
    width: 20%;
  }
  .post-author-cell {
    width: 20%;
  }
  .post-tags-cell {
    width: 20%;
  }
}
th {
  cursor: pointer;
}
.icon-centered {
  display: block !important;
  width: 100% !important;
  text-align: center !important;
}
.filters {
  padding-bottom: 5px;
  padding-top: 15px;
}
.states {
  padding-bottom: 5px;
  padding-left: 5px;
}
.stateCnt {
  color: rgb(122, 121, 121);
  font-size: 14px;
  padding-left: 3px;
}
.state {
  padding-left: 4px;
  padding-right: 5px;
}
.activeState {
  color: rgb(0, 0, 0) !important;
}
</style>
