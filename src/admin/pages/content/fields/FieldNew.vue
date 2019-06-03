<template>
  <div class="container is-widescreen">

    <h3 class="is-size-3 has-text-centered">Create content field</h3><br>
    <div class="box">
      <div class="columns">
        <div class="column is-one-third">
          <div class="field">
            <label class="label">Field name</label>
            <div class="control">
              <input class="input" type="text" placeholder="Field name" v-model="fieldName">
            </div>
          </div>
          <div class="field">
            <label class="label">Field type</label>
            <div class="control">
              <dropdown :options="fieldTypes" :selectedElement="fieldType" />
            </div>
          </div>
          <div class="field">
            <label class="label">Multi value allowed</label>
            <div class="control">
              <checkbox v-model="multiValue" />
            </div>
            <label class="label">Sortable</label>
            <div class="control">
              <checkbox v-model="sortable" />
            </div>
          </div>
        </div>
      </div>
      <div class="buttons">
        <button type="submit" class="button is-success" :disabled="fieldName === '' || fieldType.id === ''" @click="add()">Add field</button>
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
      sortable: false,
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
        },
        {
          id: 'richtextbox',
          label: 'Richtextbox'
        },
        {
          id: 'tags',
          label: 'Tags'
        },
        {
          id: 'select',
          label: 'Select'
        },
        {
          id: 'image',
          label: 'Image'
        }
      ]
    }
  },
  props: ['add-field'],
  methods: {
    add () {
      let f = {
        name: this.fieldName,
        type: this.fieldType.id,
        multiValue: this.multiValue,
        sortable: this.sortable
      }
      if (f.sortable && f.type === 'textarea') {
        this.$notify({
          title: 'Important message',
          text: 'Field type must be other than \'textarea\' to apply sorting',
          type: 'error'
        })
        return
      }
      this.addField(f)
      this.fieldName = ''
      this.fieldType = {
        id: '',
        label: 'Field type'
      }
      this.multiValue = false
      this.sortable = false
      this.$router.push({ path: '/admin/content' })
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
