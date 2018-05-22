<template>
  <div class="container">

    <!-- notification -->
    <transition mode="out-in" name="fade">
      <div v-if="notification.message" :class="'notification is-' + notification.type">
        <button class="delete" @click="hideNotifications"></button>{{notification.message}}
      </div>
    </transition>

    <!-- routes builder -->
    <h2>Routes Builder</h2>
    <div class="box">
      <div class="columns">

        <!-- link form -->
        <div class="column">

          <div class="field">
            <label class="label">Path</label>
            <div class="control">
              <input class="input" type="text" v-model="form.path" placeholder="Ex: /path">
            </div>
          </div>

          <div class="field">
            <label class="label">Template</label>
            <div class="select is-fullwidth">
              <select v-model="form.template">
                <option v-for="(template, i) in templates" :key="i" :value="template.filename">
                  {{template.displayName}}
                </option>
              </select>
            </div>
          </div>

          <div class="field">
            <label class="label">Content type</label>
            <div class="select is-fullwidth">
              <select v-model="form.contentType">
                <option v-for="(type, i) in contentTypes" :key="i" :value="type">
                  {{type}}
                </option>
                <option value="none">No Content Type</option>
              </select>
            </div>
          </div>

          <div class="field">
            <label class="label">Content</label>
            <div class="select is-fullwidth">
              <select v-model="form.content">
                <option v-for="(content, i) in selectedContents" :key="i" :value="content['.key']">
                  {{ content['.key'] + (content['slugValue'] ? ` (${content['slugValue']})` : '')}}
                </option>
                <option value="none">No Content</option>
              </select>
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
              <button class="button" @click="clear">Cancel</button>
            </div>
          </div>
        </div>

        <div class="column">
          <!-- preserved routes list -->
          <ul>
            <h3 class="is-marginless">Preserved routes:</h3>
            <li v-for="(route, i) in defaultRoutes" :key="i">
              <router-link :to="route">{{route}}</router-link>
            </li>
          </ul>
          <!-- dynamic routes list -->
          <ul>
            <h3>Dynamic routes:</h3>
            <li v-for="(route, i) in routes" :key="i">
              <b>Path: </b>
              <a :href="route.path" target="_blank">{{route.path}}</a>

              <span class="route-actions">
                <span class="has-text-danger fa fa-trash" @click="deleteRoute(route['.key'])"></span>
                <span class="has-text-info fa fa-edit" @click="editRoute(route)"></span>
              </span>

              <div class="route-details">
                <span><b>Template:</b> {{getTemplateDisplayName(route.template)}} | </span>
                <span><b>Content:</b> {{selectContentByTypeAndId(route.contentType, route.content)['.key'] || 'No Content'}}</span>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { contentsRef, routesRef } from '@/admin/firebase_config'
import notifier from '@/admin/mixins/notifier'
import templates from '@/app/templates/templates.json'

export default {
  data () {
    return {
      form: {
        path: '/',
        template: templates[0].filename,
        contentType: 'none',
        content: 'none',
        action: 'add',
        key: ''
      },
      defaultRoutes: ['/', '/admin', '/login'],
      templates
    }
  },
  firebase: {
    contents: contentsRef,
    routes: routesRef
  },
  computed: {
    contentTypes () {
      return this.contents.map(content => {
        return content.name
      })
    },
    selectedContents () {
      return this.getContentsByType(this.form.contentType)
    }
  },
  mixins: [notifier],
  methods: {
    selectContentByTypeAndId (type, id) {
      let contentsByType = this.getContentsByType(type)
      return contentsByType.filter(content => content['.key'] === id)[0] || {}
    },
    addRoute () {
      if (this.isPathAvailable(this.form.path)) {
        this.$firebaseRefs.routes.push({
          path: this.form.path.trim(),
          template: this.form.template,
          contentType: this.form.contentType,
          content: this.form.content
        })
          .then((res) => {
            let template = this.form.template
            this.showNotification('success', 'Route added successfully')
            this.$router.addRoutes([{
              path: this.form.path,
              component: () => import(`@/app/templates/${template}.vue`)
            }])
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
      this.form.contentType = route.contentType
      this.form.path = route.path
      this.form.action = 'update'
      this.form.key = route['.key']
    },
    updateRoute () {
      this.$firebaseRefs.routes.child(this.form.key).set({
        content: this.form.content,
        path: this.form.path.trim(),
        template: this.form.template,
        contentType: this.form.contentType
      })
        .then(() => {
          let template = this.form.template
          this.showNotification('success', 'Route Updated successfully')
          this.$router.addRoutes([{
            path: this.form.path,
            component: () => import(`@/app/templates/${template}.vue`)
          }])
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
      this.form.template = templates[0].filename
      this.form.action = 'add'
    },
    isPathAvailable (path) {
      let existingPaths = this.routes.map(route => {
        return route.path
      })
      existingPaths = existingPaths.concat(this.defaultRoutes)
      return !existingPaths.includes(this.form.path.trim())
    },
    getTemplateDisplayName (filename) {
      let displayName = ''
      templates.forEach(template => {
        displayName = template.filename === filename ? template.displayName : displayName
      })
      return displayName
    },
    getContentsByType (contentType) {
      let selectedContentsData = []
      let selectedContents = this.contents.filter(content => {
        return content.name === contentType
      })
      selectedContents.forEach(content => {
        let contentDataArray = this.convertContentDataToArray(content.data, content.slug)
        selectedContentsData = selectedContentsData.concat(contentDataArray || [])
      })
      return selectedContentsData
    },
    convertContentDataToArray (contentData, slug) {
      let contentDataArray = []
      for (let key in contentData) {
        contentDataArray.push({
          ...contentData[key],
          slugValue: slug ? contentData[key][slug] : '',
          '.key': key
        })
      }
      return contentDataArray
    }
  },
  watch: {
    form: {
      deep: true,
      handler () {
        if (this.form.contentType === 'none') {
          this.form.content = 'none'
        }
      }
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
