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
              </span>
            </div>

            <div class="control column is-two-thirds">
              <input type="text" class="input" :name="field" :placeholder="field" v-model="currentPage.fields[key]">
            </div>
          </div>
          <p v-if="!currentPage.fields">
            Add a property to get started!
          </p>
          <!-- Main container -->
          <nav class="level">
            <!-- Left side -->
            <div class="level-left">
              <!--<div class="level-item"></div>-->
            </div>
            <!-- Right side -->
            <div class="level-right">
              <div class="level-item">
                <button type="button" class="button is-pulled-right" @click="addPageField">
                  Add Page field
                </button>
              </div>
              <div class="level-item">
                <button type="button" class="button is-info is-pulled-right">
                  Save Changes
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
