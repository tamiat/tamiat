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
            <div class="select is-medium is-fullwidth">
              <select v-model="form.content">
                <option v-for="(content, i) in contents" :key="i" :value="content['.key']">
                  {{content.title}}
                </option>
              </select>
            </div>
          </div>

          <div class="field">
            <label class="label">Template</label>
            <div class="select is-medium is-fullwidth">
              <select v-model="form.template">
                <option v-for="(template, i) in templates" :key="i" :value="template">
                  {{template}}
                </option>
              </select>
            </div>
          </div>

          <div class="field">
            <label class="label">Route</label>
            <div class="control">
              <input class="input" type="text" v-model="form.route" placeholder="Ex: /route">
            </div>
          </div>

          <!-- buttons -->
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-info" @click="addRoute">Add</button>
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
              <div style="padding-left: 20px; margin-bottom: 20px;">
                <span><b>Path:</b> {{route.route}} | </span>
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
        route: '/',
        template: ''
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
      this.$firebaseRefs.routes.push({
        content: this.form.content,
        route: this.form.route.trim(),
        template: this.form.template
      })
        .then((res) => {
          console.log(res)
          this.showNotification('success', 'Route added successfully')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
