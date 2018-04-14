<template>
 <div class="container posts" id="posts">

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
      <modal @close="showModal = false" :kind="kind" @confirmDeleteContent='confirmDeleteContent()' @selectBulkActions='selectBulkActions()' v-if="showModal" :header="header"/>
    </transition>

    <!-- New content form loaded via router -->
    <router-view :add-content="addContent" :fields="content.fields" :update-content="updateContent" :content="contentData" :key="$route.name + ($route.params.key || '')"></router-view>

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
      <div >
        <!-- Categories
        <dropdown :options="postsList" :selectedElement="params.category" />-->
        <!-- Bulk actions -->
        <dropdown :options="bulkActions" :selectedElement="params.bulkAction" @selectBulkActions="selectBulkActions()" @bulkDelete="bulkDelete()"/>
      </div>
    </div>

    <!-- Contents list -->
    <div class="box">
      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th >
              Created
              <span class="icon">
                <i :class="{ 'fa fa-sort-down': !sortOptions.created.reverse, 'fa fa-sort-up': sortOptions.created.reverse }"></i>
              </span>
            </th>
            <th v-for="(field, fieldKey) in contentData[0]" :key="fieldKey" v-if="findField(fieldKey)">
              {{ fieldKey }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(content, index) in filteredContent" :key="index">
            <td class="post-title-cell">
              <checkbox v-model="content.selected" />
              {{ formatDate(content.created) }}
              <div class="actions">
                <router-link :to="'/admin/content/' + $route.params.key + '/edit/' + content['.key']">
                  <span class="has-text-info">Edit</span>
                </router-link>
                <span @click="deleteContent(content)" class="has-text-danger">Delete</span>
              </div>
            </td>
            <td class="post-title-cell" v-for="(field, fieldKey) in filteredContent[index]" :key="fieldKey" v-if="findField(fieldKey)">
              {{ field }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { contentsRef } from '@/admin/firebase_config'
import notifier from '@/admin/mixins/notifier'
import modal from '@/admin/components/shared/Modal'
import dropdown from '@/admin/components/shared/Dropdown'
import checkbox from '@/admin/components/shared/Checkbox'
import contentFilters from '@/admin/mixins/contentFilters'

export default {
  name: 'contents',
  data () {
    return {
      content: null,
      contentData: [],
      selContent: null,
      showModal: false,
      header: '',
      kind: '',
      sortKey: 'tittle'
    }
  },
  firebase: {
    contents: contentsRef
  },
  mixins: [notifier, contentFilters],
  mounted () {
    this.content = Object.assign(
      {},
      (this.contents.filter((content) => {
        return (content['.key'] === this.$route.params.key)
      }))[0]
    )
    // this.$bindAsObject('contentData', db.ref('contents/' + this.$route.params.id + '/data'))

    if (this.content.data) {
      let dataKeys = Object.keys(this.content.data)
      this.contentData = Object.values(this.content.data)
      let j = 0
      for (var i in dataKeys) {
        this.contentData[j]['.key'] = dataKeys[i]
        j++
      }
      // this.contentData = Object.values(this.content.data)
    }
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
    }
  },
  methods: {
    findField (field) {
      for (var key in this.content.fields) {
        if (this.content.fields[key].name.toLowerCase() === field) {
          if (this.content.fields[key].sortable) {
            return true
          }
        } else {
          // this.findField(this.content.fields[key].name)
        }
      }
      return false
    },
    formatDate (epoch) {
      if (!epoch) return // if no time return nothing
      return moment(epoch).format('MM/DD/YY | hh:mm')
    },
    addContent (content) {
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
      console.log(JSON.stringify(content), content)
      // create a copy of the item
      let tempCon = { ...content }
      // remove the .key attribute
      delete tempCon['.key']
      this.$firebaseRefs.contents.child(this.$route.params.key + '/data').child(this.selContent['.key']).set(tempCon)
        .then(() => {
          if (content.state === 'saved') {
            this.showNotification('success', 'Content updated successfully')
          }
          if (content.state === 'published') {
            this.showNotification('success', 'Content updated and published successfully')
          }
        })
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
    width: 40%;
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
  cursor: pointer
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
