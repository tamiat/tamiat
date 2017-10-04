<template>
  <div class="container settings" id="settings">

    <!-- notification -->
    <div v-if="notification.message" :class="'notification is-' + notification.type">
      <button class="delete" @click="hideNotifications"></button>{{notification.message}}
    </div>

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
                      <a class="dropdown-item" v-for="page, key in pages" @click="selectPage(key)" v-if="page.name">
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
                <button @click="deletePage" type="button" title="delete" class="button is-danger is-pulled-right">
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
import { pagesRef } from '../../../config';
import notifier from '../../../mixins/notifier';

export default {
  name: 'pages',
  data() {
    return {
      dropdownActive: false,
      currentPageKey: '',
      dropDownLabel: "Select Page"
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
    currentPage() {
      return this.pages[this.currentPageKey] || {}
    },
    currentPageRef() {
      return this.$firebaseRefs.pages.child(this.currentPageKey)
    }
  },
  methods: {
    selectPage(key) {
      this.currentPageKey = key;
    },
    toggleDropdown () {
      this.dropdownActive = !this.dropdownActive;
    },
    savePage() {
      delete this.currentPage['.key'] // This is a bit weird but no problem
      this.currentPageRef.update(this.currentPage).then(() => {
        this.showNotification('success', 'Page successfully saved');
      })
    },
    addPageField() {
      const newFieldName = prompt("Name for new property:");
      if (this.currentPage.fields && this.currentPage.fields.hasOwnProperty(newFieldName)) {
        alert('This property already does exist')
        return
      }
      this.currentPageRef
        .child('fields')
        .update({
          [newFieldName]: ''
        })
        .then(() => {
          this.showNotification('success', 'Property Successfully added');
        })
        .catch(() => {
          this.showNotification('error', 'Property not added');
        })
    },
    deletePageField(key) {
      const name = prompt("Type the name of the property to comfirm");
      if (key != name) {
        console.log(`${key} was not equal to ${name}`)
        alert('property name did not match')
        return
      }
      this.currentPageRef
        .child('fields')
        .child(key)
        .remove()
        .then(() => {
          this.selectPage(key)
          this.showNotification('success', 'Property successfully removed');
        })
        .catch(() => {
          this.showNotification('error', 'Property not removed');
        })
    },
    addPage() {
      const name = prompt("Name for new page:");
      if (this.pages.hasOwnProperty(name)) {
        alert('This page already does exist')
        return
      }
      const key = this.$firebaseRefs.pages.push().key
      this.$firebaseRefs.pages
        .child(key)
        .update({name})
        .then(() => {
          this.selectPage(key)
          this.showNotification('success', 'Page Successfully added');
        })
        .catch(() => {
          this.showNotification('error', 'Page not added');
        })
    },
    deletePage() {
      const key = this.currentPageKey
      const name = prompt("Type the name of the page to comfirm");
      if (this.currentPage.name != name) {
        console.log(`${this.currentPage.name} was not equal to ${name}`)
        alert('Page name did not match')
        return
      }
      this.$firebaseRefs.pages
        .child(key)
        .remove()
        .then(() => {
          this.selectPage(key)
          this.showNotification('success', 'Page successfully removed');
        })
        .catch(() => {
          this.showNotification('error', 'Page not removed');
        })
    }
  }
}

</script>

<style lang="scss">
#settings {
  h3 {
    margin: 1em 1em 1em 0em;
  }
}
</style>
