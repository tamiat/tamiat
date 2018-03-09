<template>
 <div class="container is-widescreen">

    <!-- notification -->
      <transition mode="out-in" name="fade">
        <div v-if="notification.message" :class="'notification is-' + notification.type">
          <button class="delete" @click="hideNotifications"></button>{{notification.message}}
        </div>
      </transition>
    <h3 class="is-size-3 has-text-centered">Create custom content type</h3><br>
    <div class="box">
      <div class="columns">

        <!-- link form -->
        <div class="column">
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input class="input" type="text" placeholder="e.g. Movies" v-model="name">
            </div>
          </div>
          <button type="submit" class="button is-success" @click="createMenuItem()">Create new</button><br><br><br>
        <!-- Attributes
          <p class="is-size-4">Supports: </p><br> -->
          <div class="columns">
             <!-- <div class="column is-one-third">
              <div class="field">
                <checkbox v-model="supports.editor" /> Text editor
              </div>
              <div class="field">
                <checkbox v-model="supports.image" /> Featured image
              </div>
              <div class="field">
                <checkbox v-model="supports.video" /> Video support
              </div>
              <div class="field">
                <checkbox v-model="supports.categories" /> Categories
              </div>
              <div class="field">
                <checkbox v-model="supports.tags" /> Tags
              </div>
            </div> -->
            <div class="column is-one-half">
            <!-- Custom Fields -->
              <div class="field">
                <label class="label">Fields</label>
                <div class="field is-grouped is-grouped-multiline">
                  <div class="control">
                    <input type="text" class="input" placeholder="Field name" v-model="fieldName">
                  </div>
                </div>
                <button type="submit" class="button is-success" @click="addField()">Add field</button>
              </div><br><br>
            </div>
            <div class="column is-two-half">
              <div class="field is-grouped is-grouped-multiline">
                <div class="control"  v-for="(field, fieldKey) in fields" :key="fieldKey">
                 <div class="field">
                    <checkbox /> {{ field.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div><br><br>
      <div class="buttons is-centered">
        <!-- <button type="submit" class="button is-success" @click="createMenuItem()">Create new</button>-->
      </div>
    </div>
  </div>
</template>

<script>
import checkbox from '@/admin/components/shared/Checkbox'
import { contentsRef, fieldsRef } from '@/admin/firebase_config'
import notifier from '@/admin/mixins/notifier'
export default {
  name: 'content-type',
  mixins: [notifier],
  firebase: {
    contents: contentsRef,
    fields: fieldsRef
  },
  data () {
    return {
      name: '',
      supports: {
        title: false,
        editor: false,
        image: false,
        customFields: false,
        categories: false,
        tags: false
      },
      fieldName: ''
    }
  },
  created () {
    // this.$store.commit('resetState')
  },
  methods: {
    createMenuItem () {
      let path = this.name.toLowerCase()
      path = path.replace(/^[, ]+|[, ]+$|[, ]+/g, '').trim()
      let item = {
        name: this.name,
        path: `/admin/content/${path}`,
        icon: 'fa-file-text'
        /* supports: {
          title: this.supports.title,
          editor: this.supports.editor,
          image: this.supports.image,
          customFields: this.supports.customFields,
          categories: this.supports.categories,
          tags: this.supports.tags
        }
        */
      }
      this.$firebaseRefs.contents.push(item).then(() => {
        this.showNotification('success', 'Content added successfully')
      })
      /* this.$store.dispatch('pushMenuItem', item)
        .then(() => {
          this.resetForm()
        })
      */
    },
    addField () {
      let f = {
        name: this.fieldName
      }
      this.$firebaseRefs.fields.push(f).then(() => {
        this.showNotification('success', 'Field added successfully')
      })
      // this.fields.push(this.fieldName)
      this.fieldName = ''
    },
    resetForm () {
      this.name = ''

      for (var key in this.supports) {
        this.supports[key] = false
      }
    }
  },
  components: {
    checkbox
  }
}

</script>

<style>

</style>
