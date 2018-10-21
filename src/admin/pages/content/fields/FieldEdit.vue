<template>
  <div class="container is-widescreen">

    <h3 class="is-size-3 has-text-centered">Edit content field</h3><br>
    <div class="box">
      <div class="columns">
        <div class="column is-one-third">
          <div class="field">
            <label class="label">Field name</label>
            <div class="control">
              <input class="input" type="text" placeholder="Field name" v-model="field.name">
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
              <checkbox v-model="field.multiValue" />
            </div>
          </div>
        </div>
      </div>
      <div class="buttons">
        <button type="submit" class="button is-success" :disabled="field.name === '' || field.type === ''" @click="edit()">Edit field</button>
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
  name: 'fieldEdit',
  mixins: [notifier],
  firebase: {
    contents: contentsRef,
    fields: fieldsRef
  },
  data () {
    return {
      field: null,
      multiValue: false,
      fieldType: {
        id: '',
        label: 'Field type'
      },
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
  props: ['edit-field'],
  created () {
    this.field = Object.assign(
      {},
      (this.fields.filter((field) => {
        return (field['.key'] === this.$route.params.key)
      }))[0]
    )
    this.fieldType.id = this.field.type
    this.fieldType.label = this.field.type.charAt(0).toUpperCase() + this.field.type.slice(1)
  },
  methods: {
    edit () {
      let f = {
        name: this.field.name,
        type: this.fieldType.id,
        multiValue: this.field.multiValue
      }
      this.editField(this.field, f)
      this.$router.push({ path: '/admin/content' })
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
