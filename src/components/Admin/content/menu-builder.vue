<template>
  <div>
    <!-- navigation menu builder -->
    <h3 class="is-size-3">Navigation Menu Builder</h3>
    <div class="box">
      <div class="columns">

        <div class="column">
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input class="input" type="text" placeholder="Name (ex: Posts)" v-model="name">
            </div>
          </div>
          <div class="field">
            <label class="label">Path</label>
            <div class="control">
              <input class="input" type="text" placeholder="Path (ex: /admin/posts)" v-model="path">
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button v-if="action === 'new'" class="button is-info" @click="addLink">Add</button>
              <button v-if="action === 'edit'" class="button is-info" @click="updateLink">
                Update
              </button>
              <button v-if="action === 'sub'" class="button is-info" @click="appendSubLink">
                Add sub-link
              </button>
            </div>
            <div class="control">
              <button class="button" @click="clear">Cancel</button>
            </div>
          </div>
        </div>

        <div class="column">
          <p class="is-size-4">menu</p>
          <ul v-for="(item, index) in menu" :key="index">
            <li>
              |__ {{item.name}}: {{item.path}}

              <span class="delete has-text-danger" @click="removeLink(item)">delete</span>

              <!-- move up -->
              <span v-if="index !== 0" class="has-text-success" style="cursor: pointer;" @click="moveUp(item, menu[index - 1])">UP</span>

              <!-- move down -->
              <span v-if="index !== menu.length - 1" class="has-text-danger" style="cursor: pointer;" @click="moveDown(item, menu[index + 1])">DOWN</span>

              <!-- edit -->
              <span class="has-text-info" style="cursor: pointer;" @click="editLink(item)">
                EDIT
              </span>

              <!-- add sub link -->
              <span class="has-text-primary" style="cursor: pointer;" @click="addSubLink(item)">
                SUB
              </span>

              <!-- render children links -->
              <ul v-if="item.children" style="padding-left: 30px;">
                <li v-for="(child, index) in item.children" :key="index">
                  |__ {{child.name}}: {{child.path}}
                </li>
              </ul>
            </li>
          </ul>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import { settingsRef, navRef } from '../../../config'
export default {
  data () {
    return {
      key: '',
      link: '', // {'.key', name, path}
      name: '',
      path: '',
      action: 'new'
    }
  },
  firebase: {
    settings: {
      source: settingsRef,
      asObject: true
    },
    menu: {
      source: navRef
    }
  },
  methods: {
    addLink () {
      if (this.name && this.path) {
        this.$firebaseRefs.menu.push({ name: this.name, path: this.path })
      }
      this.clear()
    },
    editLink (link) {
      this.name = link.name
      this.path = link.path
      this.action = 'edit'
      this.key = link['.key']
      this.link = Object.assign({}, link)
    },
    updateLink () {
      delete this.link['.key']
      this.link.name = this.name
      this.link.path = this.path

      this.$firebaseRefs.menu.child(this.key).set(this.link)
      this.clear()
    },
    removeLink (item) {
      this.$firebaseRefs.menu.child(item['.key']).remove()
    },
    clear () {
      this.name = ''
      this.path = ''
      this.action = 'new'
    },
    moveUp (item, previousItem) {
      let itemCopy = Object.assign({}, item)
      let previousItemCopy = Object.assign({}, previousItem)

      delete itemCopy['.key']
      delete previousItemCopy['.key']

      this.$firebaseRefs.menu.child(item['.key']).set(previousItemCopy)
      this.$firebaseRefs.menu.child(previousItem['.key']).set(itemCopy)
    },
    moveDown (item, nextItem) {
      let itemCopy = Object.assign({}, item)
      let nextItemCopy = Object.assign({}, nextItem)

      delete itemCopy['.key']
      delete nextItemCopy['.key']

      this.$firebaseRefs.menu.child(item['.key']).set(nextItemCopy)
      this.$firebaseRefs.menu.child(nextItem['.key']).set(itemCopy)
    },
    addSubLink (link) {
      this.action = 'sub'
      this.key = link['.key']
    },
    appendSubLink () {
      this.$firebaseRefs.menu.child(this.key).child('children').push({
        name: this.name,
        path: this.path
      })
      this.clear()
    }
  }
}
</script>
