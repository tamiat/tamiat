<template>
 <div class="container is-widescreen">

    <!-- notification -->
      <transition mode="out-in" name="fade">
        <div v-if="notification.message" :class="'notification is-' + notification.type">
          <button class="delete" @click="hideNotifications"></button>{{notification.message}}
        </div>
      </transition>
    <h3 class="is-size-3 has-text-centered">Create Field</h3><br>
    <div class="box">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Field name:</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input type="text" class="input" placeholder="Field name" v-model="fieldName">
            </p>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Field type:</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <dropdown :options="fieldTypes" :selectedElement="fieldType" />
            </p>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Multi value allowed</label>
        </div>
        <div class="field-body">
          <div class="field is-narrow">
            <div class="control">
              <label class="radio">
                <checkbox v-model="multiValue"/>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="buttons is-centered">
        <button type="submit" class="button is-success" @click="addField()">Add field</button>
        <router-link to="/admin/content" class="button is-danger">Cancel</router-link>
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
  name: 'fieldNew',
  mixins: [notifier],
  firebase: {
    contents: contentsRef,
    fields: fieldsRef
  },
  data () {
    return {
      fieldName: '',
      fieldType: {
        id: '',
        label: 'Field type'
      },
      multiValue: false,
      fieldTypes: [
        {
          id: 'textarea',
          label: 'Textarea'
        },
        {
          id: 'textbox',
          label: 'Textbox'
        },
        {
          id: 'integer',
          label: 'Integer'
        },
        {
          id: 'boolean',
          label: 'Boolean'
        },
        {
          id: 'url',
          label: 'Url'
        }
      ]
    }
  },
  methods: {
    addField () {
      let f = {
        name: this.fieldName,
        type: this.fieldType.id,
        multiValue: this.multiValue
      }
      this.$firebaseRefs.fields.push(f).then(() => {
        this.showNotification('success', 'Field added successfully')
        this.fieldName = ''
        this.fieldType = {
          id: '',
          label: 'Field type'
        }
        this.multiValue = false
      })
    },
    resetForm () {
      this.name = ''

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
