<template>
  <div class="container">

    <!-- notification -->
    <transition mode="out-in" name="fade">
      <div v-if="notification.message" :class="'notification is-' + notification.type">
        <button class="delete" @click="hideNotifications"></button>{{notification.message}}
      </div>
    </transition>

    <!-- routes builder -->
    <h3 class="is-size-3">Routes Builder</h3>
    <div class="box">
      <div class="columns">

        <!-- link form -->
        <div class="column">

          <div class="field">
            <label class="label">Content</label>
            <div class="select is-fullwidth">
              <select v-model="form.content">
                <option v-for="(content, i) in contents" :key="i" :value="content['.key']">
                  {{content.title}}
                </option>
              </select>
            </div>
          </div>

          <div class="field">
            <label class="label">Template</label>
            <div class="select is-fullwidth">
              <select v-model="form.template">
                <option v-for="(template, i) in templates" :key="i" :value="template">
                  {{template}}
                </option>
              </select>
            </div>
          </div>

          <div class="field">
            <label class="label">Path</label>
            <div class="control">
              <input class="input" type="text" v-model="form.path" placeholder="Ex: /path">
            </div>
          </div>

          <!-- buttons -->
          <div class="field is-grouped">
            <div class="control">
              <button v-if="form.action === 'add'" class="button is-info" @click="addRoute">
                Add
              </button>
              <button v-if="form.action === 'update'" class="button is-info" @click="updateRoute">
                Update
              </button>
            </div>
            <div class="control">
              <button class="button" >Cancel</button>
            </div>
          </div>
        </div>

        <div class="column">
          <ul>
            <li v-for="(route, i) in routes" :key="i">
              <b>Route {{i}}</b>

              <span class="route-actions">
                <span class="has-text-danger fa fa-trash" @click="deleteRoute(route['.key'])"></span>
                <span class="has-text-info fa fa-edit" @click="editRoute(route)"></span>
              </span>

              <div class="route-details">
                <span><b>Path:</b> {{route.path}} | </span>
                <span><b>Template:</b> {{route.template}} | </span>
                <span><b>Content:</b> {{selectContentById(route.content).title}}</span>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { postsRef, routesRef } from '@/admin/firebase_config'
import notifier from '@/admin/mixins/notifier'
import templates from '@/app/templates/templates.json'
export default {
  data () {
    return {
      form: {
        content: '',
        path: '/',
        template: '',
        action: 'add',
        key: ''
      },
      templates
    }
  },
  firebase: {
    contents: postsRef,
    routes: routesRef
  },
  mixins: [notifier],
  methods: {
    selectContentById (contentId) {
      return this.contents.filter(content => content['.key'] === contentId)[0]
    },
    addRoute () {
      let existingPaths = this.routes.map(route => {
        return route.path
      })

      if (!existingPaths.includes(this.form.path.trim())) {
        this.$firebaseRefs.routes.push({
          content: this.form.content,
          path: this.form.path.trim(),
          template: this.form.template
        })
          .then((res) => {
            this.showNotification('success', 'Route added successfully')
            this.clear()
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.showNotification('danger', 'A route with the same path already exists')
      }
    },
    editRoute (route) {
      this.form.content = route.content
      this.form.template = route.template
      this.form.path = route.path
      this.form.action = 'update'
      this.form.key = route['.key']
    },
    updateRoute () {
      this.$firebaseRefs.routes.child(this.form.key).set({
        content: this.form.content,
        path: this.form.path.trim(),
        template: this.form.template
      })
        .then(() => {
          this.showNotification('success', 'Route Updated successfully')
          this.clear()
        })
    },
    deleteRoute (key) {
      this.$firebaseRefs.routes.child(key).remove()
        .then(() => {
          this.showNotification('success', 'Route deleted successfully')
        })
    },
    clear () {
      this.form.key = ''
      this.form.path = '/'
      this.form.content = ''
      this.form.template = ''
      this.form.action = 'add'
    }
  }
}
</script>

<style lang="scss" scoped>
.route-actions {
  padding-left: 10px;
  display: none;
  span {
    cursor: pointer;
    padding-right: 5px;
  }
}

li:hover .route-actions {
  display: inline;
}

.route-details {
  padding-left: 20px;
  margin-bottom: 10px;
}
</style>
