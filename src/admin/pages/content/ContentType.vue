<template>
 <div class="container is-widescreen">
  <router-view></router-view><br><br>
    <!-- notification -->
      <transition mode="out-in" name="fade">
        <div v-if="notification.message" :class="'notification is-' + notification.type">
          <button class="delete" @click="hideNotifications"></button>{{notification.message}}
        </div>
      </transition>
    <h3 class="is-size-3 has-text-centered">Create custom content type</h3><br>
    <div class="box">
      <div class="columns">

        <div class="column is-centered">
          <div class="field">
            <label class="label">Content type name</label>
            <div class="control">
              <input class="input" type="text" placeholder="e.g. Movies" v-model="name">
            </div>
          </div><br><br>
          <div class="columns">
            <div class="column">
            <!-- Custom Fields -->
              <label class="label">Fields</label>
              <div class="field is-grouped is-grouped-multiline">
                <ul>
                  <li v-for="(field, fieldKey) in fields" :key="fieldKey" v-if="field.checked"> {{ field.name }} </li>
                </ul>
              </div>
            </div>
            <div class="column">
              <label class="label">Available fields</label>
              <div class="field is-grouped is-grouped-multiline">
                <ul>
                <li class="control"  v-for="(field, fieldKey) in fields" :key="fieldKey">
                 <span class="field">
                    <checkbox :label="field.name" v-model="field.checked"/>
                  </span>
                </li>
                </ul>
              </div><br>
               <router-link to="/admin/content/fieldNew" class="button is-info is-small">Add new field</router-link>
            </div>
          </div>
        </div>
      </div><br><br>
      <div class="buttons is-centered">
        <button type="submit" class="button is-success" @click="createMenuItem()">Create new</button>
      </div>
    </div>
  </div>
</template>

<script>
import checkbox from '@/admin/components/shared/Checkbox'
import dropdown from '@/admin/components/shared/Dropdown'
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
      name: ''
    }
  },
  created () {
    // this.$store.commit('resetState')
  },
  methods: {
    createMenuItem () {
      let path = this.name.toLowerCase()
      path = path.replace(/^[, ]+|[, ]+$|[, ]+/g, '').trim()

      let selectedFields = this.fields.filter(field => {
        return field.checked
      })
      selectedFields = selectedFields.map(field => {
        return {
          name: field.name,
          type: field.type,
          multiValue: field.multiValue
        }
      })

      let item = {
        name: this.name,
        path: `/admin/content/${path}`,
        icon: 'fa-file-text',
        fields: selectedFields
      }
      this.$firebaseRefs.contents.push(item).then(() => {
        this.showNotification('success', 'Content type added successfully')
        this.resetForm()
      })
      /* this.$store.dispatch('pushMenuItem', item)
        .then(() => {
          this.resetForm()
        })
      */
    },
    resetForm () {
      this.name = ''
      for (var fieldKey in this.fields) {
        this.fields[fieldKey].checked = false
      }
      for (var key in this.supports) {
        this.supports[key] = false
      }
    }
  },
  components: {
    checkbox,
    dropdown
  }
}

</script>

<style>

</style>
