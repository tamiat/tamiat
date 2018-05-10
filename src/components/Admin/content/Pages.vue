<template>
  <div class="container settings" id="settings">

    <!-- notification -->
    <transition mode="out-in" name="fade">
      <div v-if="notification.message" :class="'notification is-' + notification.type">
        <button class="delete" @click="hideNotifications"></button>{{notification.message}}
      </div>
    </transition>

    <!-- modal for page and field -->
    <transition mode="out-in" name="fade">
      <modal @close="showModal = false" :kind="kind" @addField='confirmAddField' @addPage='confirmAddPage' @confirmDeleteField='confirmDeletePageField()' @confirmDeletePage='confirmDeletePage()' v-if="showModal" :header="header"/>
    </transition>

    <h3 class="is-size-3">Pages</h3>
    <div class="box">
      <div class="columns">

        <div class="column is-multiline">
          <!-- Main container -->
          <nav class="level">
            <!-- Left side -->
            <div class="level-left">
              <!--<div class="level-item"></div>-->
            </div>
            <!-- Right side -->
            <div class="level-right">
              <div class="level-item">
                <div class="dropdown" :class="{'is-active': dropdownActive}" @click="toggleDropdown">
                  <div class="dropdown-trigger">
                    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                      <span>{{currentPage.name || dropDownLabel}}</span>
                      <span class="icon is-small">
                        <i class="fa fa-angle-down" aria-hidden="true"></i>
                      </span>
                    </button>
                  </div>
                  <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                      <a class="dropdown-item" v-if="page && page.name" v-for="(page, key) in pages" :key="page.name" @click="selectPage(key)">
                        {{page.name}}
                      </a>
                      <hr class="dropdown-divider">
                      <a @click="addPage" class="dropdown-item">
                        New Page
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <div v-for="(field, key) in currentPage.fields" class="field columns" :key="key">
            <div class="column is-one-third">
              <span class="tag">
                {{key}}
                <button class="delete is-small" @click="deletePageField(key)"></button>
              </span>
            </div>

            <div class="control column is-two-thirds">
              <input type="text" class="input" :name="field" :placeholder="field" v-model="currentPage.fields[key]">
            </div>
          </div>
          <p v-if="!currentPage.fields && currentPage.name">
            Add a property to get started!
          </p>
          <!-- Main container -->
          <nav class="level" v-if="currentPage.name">
            <!-- Left side -->
            <div class="level-left">
              <!--<div class="level-item"></div>-->
            </div>
            <!-- Right side -->
            <div class="level-right">
              <div class="level-item">
                <button type="button" class="button is-pulled-right" @click="addPageField">
                  Add field
                </button>
              </div>
              <div class="level-item">
                <button @click="savePage" type="button" class="button is-info is-pulled-right">
                  Save Changes
                </button>
              </div>
              <div class="level-item">
                <button @click="deletePage()" type="button" title="delete" class="button is-danger is-pulled-right">
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </nav>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { pagesRef } from '@/firebase_config'
import notifier from '@/mixins/notifier'
import modal from '@/components/shared/Modal'
export default {
  name: 'pages',
  data () {
    return {
      dropdownActive: false,
      currentPageKey: '',
      dropDownLabel: 'Select Page',
      showModal: false,
      deleteKey: '',
      header: '',
      kind: ''
    }
  },
  firebase: {
    // load settings as an object instead of array (default)
    pages: {
      source: pagesRef,
      asObject: true
    }
  },
  mixins: [notifier],
  computed: {
    currentPage () {
      return this.pages[this.currentPageKey] || {}
    },
    currentPageRef () {
      return this.$firebaseRefs.pages.child(this.currentPageKey)
    }
  },
  methods: {
    selectPage (key) {
      this.currentPageKey = key
    },
    toggleDropdown () {
      this.dropdownActive = !this.dropdownActive
    },
    savePage () {
      delete this.currentPage['.key'] // This is a bit weird but no problem
      this.currentPageRef.update(this.currentPage).then(() => {
        this.showNotification('success', 'Page successfully saved')
      })
    },
    addPageField () {
      this.header = 'Name for a new property: '
      this.kind = 'addField'
      this.showModal = true
    },
    confirmAddField (value) {
      if (this.currentPage.fields && this.currentPage.fields.hasOwnProperty(value)) {
        this.showNotification('danger', 'This property already exist')
        return
      }
      this.currentPageRef
        .child('fields')
        .update({
          [value]: ''
        })
        .then(() => {
          this.showNotification('success', 'Property Successfully added')
          this.showModal = false
        })
        .catch(() => {
          this.showNotification('danger', 'Property not added')
        })
    },
    addPage () {
      this.header = 'Name for a new page: '
      this.kind = 'addPage'
      this.showModal = true
    },
    confirmAddPage (value) {
      let name = value
      if (name === '') {
        this.showNotification('danger', 'Please input the name of the page first')
        return
      }
      if (this.pages.hasOwnProperty(name)) {
        this.showNotification('danger', 'This page already exist')
        return
      }

      let key = this.$firebaseRefs.pages.push().key
      this.$firebaseRefs.pages
        .child(key)
        .update({name})
        .then(() => {
          this.selectPage(key)
          this.showNotification('success', 'Page Successfully added')
          this.showModal = false
        })
        .catch(() => {
          this.showNotification('danger', 'Page not added')
        })
    },
    deletePageField (key) {
      this.header = 'Are you sure you want to delete this field?'
      this.kind = 'deleteField'
      this.showModal = true
      this.deleteKey = key
    },
    confirmDeletePageField () {
      this.currentPageRef
        .child('fields')
        .child(this.deleteKey)
        .remove()
        .then(() => {
          // this.selectPage(this.deleteKey)
          this.showNotification('success', 'Property successfully removed')
          this.showModal = false
          this.deleteKey = ''
          this.kind = ''
        })
        .catch(() => {
          this.showNotification('danger', 'Property not removed')
        })
    },
    deletePage () {
      this.header = 'Are you sure you want to delete this page?'
      this.kind = 'deletePage'
      this.showModal = true
    },
    confirmDeletePage () {
      const key = this.currentPageKey
      this.$firebaseRefs.pages
        .child(key)
        .remove()
        .then(() => {
          this.selectPage(key)
          this.showNotification('success', 'Page successfully removed')
          this.showModal = false
          this.header = ''
          this.kind = ''
        })
        .catch(() => {
          this.showNotification('danger', 'Page not removed')
        })
    }
  },
  components: {
    modal
  }
}

</script>

<style lang="scss">
#settings {
  h3 {
    margin: 1em 1em 1em 0em;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}

.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
