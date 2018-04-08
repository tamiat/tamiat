<template>
<div class="contentType">
 <div class="container is-widescreen">
  <router-view :edit-field="editField" :add-field="addField"></router-view><br><br>
    <!-- notification -->
      <transition mode="out-in" name="fade">
        <div v-if="notification.message" :class="'notification is-' + notification.type">
          <button class="delete" @click="hideNotifications"></button>{{notification.message}}
        </div>
      </transition>
    <h3 class="is-size-3 has-text-centered">Create content type</h3><br>
    <div class="box">
      <div class="columns">

        <div class="column">
          <div class="field">
            <label class="label">Content type name</label>
            <div class="control">
              <input class="input" type="text" placeholder="e.g. Movies" v-model="name">
            </div>
          </div><br><br>
          <!-- Custom Fields -->
            <label class="label">Fields</label>
            <div class="field is-grouped is-grouped-multiline">
              <ul class="nav-preview">
                <li v-for="(field, fieldKey) in checkedFields" :key="fieldKey" v-if="field.checked">
                  {{ field.name }}
                  <span class="link-actions">
                    <span v-if="fieldKey !== 0" class="has-text-success fa fa-arrow-up" @click="moveFieldUp(field, checkedFields[fieldKey - 1])"></span>
                    <span v-if="fieldKey !== checkedFields.length - 1" class="fa fa-arrow-down" @click="moveFieldDown(field, checkedFields[fieldKey + 1])"></span>
                   </span>
                </li>
              </ul>
            </div>
          </div>
          <div class="column">
            <label class="label">Available fields</label>
            <div class="field is-grouped is-grouped-multiline">
              <ul class="nav-preview">
              <li class="control"  v-for="(field, fieldKey) in fields" :key="fieldKey">
                <span class="field">
                  <checkbox :label="field.name" v-model="field.checked"/>
                  <span class="link-actions">
                    <span class="has-text-danger fa fa-trash" @click="removeField(field)"></span>
                    <router-link :to="'/admin/content/fieldEdit/' + field['.key']"><span class="has-text-info fa fa-edit"></span></router-link>
                  </span>
                </span>
              </li>
              </ul>
            </div><br>
              <router-link to="/admin/content/fieldNew" class="button is-info is-small">Add new field</router-link>
          </div>
      </div><br><br>
      <div class="buttons">
        <button type="submit" class="button is-success" :disabled="!name || !checkedFields.length" @click="createMenuItem()">Create new</button>
      </div>
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
    this.clearChecked()
  },
  computed: {
    checkedFields () {
      return this.fields.filter(field => {
        return field.checked
      })
    }
  },
  methods: {
    createMenuItem () {
      let path = this.name.toLowerCase()
      path = path.replace(/^[, ]+|[, ]+$|[, ]+/g, '').trim()

      let selectedFields = this.checkedFields.map(field => {
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
    },
    addField (field) {
      this.$firebaseRefs.fields.push(field).then(() => {
        this.showNotification('success', 'Field added successfully')
      })
    },
    editField (field, f) {
      this.$firebaseRefs.fields.child(field['.key']).set(f).then(() => {
        this.showNotification('success', 'Field edited successfully')
      })
    },
    removeField (field) {
      this.$firebaseRefs.fields.child(field['.key']).remove()
        .then(() => {
          this.showNotification('success', 'Field removed successfully')
        })
    },
    moveFieldUp (field, previousField) {
      let itemCopy = Object.assign({}, field)
      let previousItemCopy = Object.assign({}, previousField)

      delete itemCopy['.key']
      delete previousItemCopy['.key']

      this.$firebaseRefs.fields.child(field['.key']).set(previousItemCopy)
      this.$firebaseRefs.fields.child(previousField['.key']).set(itemCopy)
    },
    moveFieldDown (field, nextField) {
      let itemCopy = Object.assign({}, field)
      let nextItemCopy = Object.assign({}, nextField)

      delete itemCopy['.key']
      delete nextItemCopy['.key']

      this.$firebaseRefs.fields.child(field['.key']).set(nextItemCopy)
      this.$firebaseRefs.fields.child(nextField['.key']).set(itemCopy)
    },
    clearChecked () {
      for (var key in this.fields) {
        delete this.fields[key]['checked']
      }
    }
  },
  components: {
    checkbox,
    dropdown
  }
}

</script>

<style lang="scss" scoped>
.contentType {
  .nav-preview {
    padding-left: 15px;
  }

  .link-actions {
    display: none;
    span {
      cursor: pointer;
    }
  }

  .nav-preview>li:hover .link-actions {
    display: inline;
  }
}
</style>
