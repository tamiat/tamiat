<template>
  <div id="settings">

    <!-- notification -->
    <div v-if="notification.message" :class="'notification is-' + notification.type">
      <button class="delete" @click="hideNotifications"></button>{{notification.message}}
    </div>
    <v-toolbar class="blue darken-1">
      <v-toolbar-title class="white--text">Pages</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="#" class="button is-info">
        <v-btn class="white blue--text" @click="newPageDialog = true">
          Add page
        </v-btn>
      </router-link>
    </v-toolbar>
    <v-progress-linear v-if="!pagesReady" color="orange lighten-2" class="mb-2 mt-0" v-bind:indeterminate="true"></v-progress-linear>
    <v-container grid-list-md text-xs-center class="pa-3">
      <v-layout row wrap>
        <v-expansion-panel>
          <v-expansion-panel-content v-if="page && page.name" v-for="(page, key) in pages" :key="page.name">
            <div slot="header" @click.prevent="selectPage(key)">{{ page.name }}</div>
            <v-card>
              <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                <v-card-actions>
                  <v-btn flat color="red darken-1" @click="deletePage(page)">
                    Delete
                  </v-btn>
                </v-card-actions>
                <!--<div v-for="(field, key) in currentPage.fields" :key="key">-->
                  <!--<div>-->
                    <!--<span>-->
                      <!--{{key}}-->
                      <!--<button @click="deletePageField(key)"></button>-->
                    <!--</span>-->
                  <!--</div>-->

                  <!--<div>-->
                    <!--<input type="text" class="input" :name="field" :placeholder="field" v-model="currentPage.fields[key]">-->
                  <!--</div>-->
                <!--</div>-->
                <!--<p v-if="!currentPage.fields && currentPage.name">-->
                  <!--Add a property to get started!-->
                <!--</p>-->
                <!--<nav v-if="currentPage.name">-->
                  <!--<div>-->
                    <!--<div>-->
                      <!--<button type="button" @click="addPageField">-->
                        <!--Add field-->
                      <!--</button>-->
                    <!--</div>-->
                    <!--<div>-->
                      <!--<button @click="savePage" type="button">-->
                        <!--Save Changes-->
                      <!--</button>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</nav>-->
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-layout>
    </v-container>
    <v-dialog v-model="newPageDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Add page</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex>
                <v-text-field label="Page name"
                  required v-model="name">
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="newPageDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="addPage">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="errorDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span>Dialog 3</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-actions>
            <v-btn color="primary" flat @click.stop="errorDialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
import { pagesRef } from '../../../config'
import notifier from '../../../mixins/notifier'

export default {
  data() {
    return {
      pagesReady: false,
      newPageDialog: false,
      errorDialog: false,
      name: '',
      prop_name: '',
      selectedPage: null
    }
  },
  firebase: {
    pages: {
      source: pagesRef,
      asObject: true,
      readyCallback: function() { this.pagesReady = true }
    }
  },
  mixins: [notifier],
  methods: {
    selectPage (key) {
      this.selectedPage = this.$firebaseRefs.pages.child(key)
    },
    // savePage() {
    //   delete this.currentPage['.key'] // This is a bit weird but no problem
    //   this.currentPageRef.update(this.currentPage).then(() => {
    //     this.showNotification('success', 'Page successfully saved');
    //   })
    // },
    addPageField(key) {
      var currentPageRef = this.$firebaseRefs.pages.child(key)
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
          this.showNotification('danger', 'Property not added');
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
          this.showNotification('danger', 'Property not removed');
        })
    },
    addPage() {
      if(!this.name){
        return
      }
      if (this.pages.hasOwnProperty(this.name)) {
        this.errorDialog = true
        return
      }
      const key = this.$firebaseRefs.pages.push().key
      this.$firebaseRefs.pages
        .child(key)
        .update({ name: this.name })
        .then(() => {
          this.selectPage(key)
          this.showNotification('success', 'Page Successfully added')
          this.newPageDialog = false
          this.name = ''
        })
        .catch(() => {
          this.showNotification('danger', 'Page not added');
        })
    },
    deletePage(page) {
      const name = prompt("Type the name of the page to comfirm")
      console.log(this.selectedPage.val())
      if (this.selectedPage.name !== name) {
        alert('Page name did not match')
        return
      }
      this.$firebaseRefs.pages.child(page['.key'])
        .remove()
        .then(() => {
          this.showNotification('success', 'Page successfully removed');
        })
        .catch(() => {
          this.showNotification('danger', 'Page not removed');
        })
    }
  }
}

</script>

<style lang="scss" scoped>
</style>
