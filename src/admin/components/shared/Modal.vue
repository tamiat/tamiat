<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ header }}</p>
        <button class="delete is-medium" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body" v-if="kind == 'addField' || kind == 'addPage' || kind == 'addSetting' || kind == 'addContentField'">
        <input type="text" class="input" v-if="kind == 'addField'" :placeholder="'Property'" v-model="fieldName">
        <input type="text" class="input" v-if="kind == 'addPage'" :placeholder="'Page'" v-model="pageName">
        <input type="text" class="input" v-if="kind == 'addSetting'" :placeholder="'Setting'" v-model="settingName">
        <div v-if="kind == 'addContentField'" >
          <div class="field">
            <label class="label">Name of the content field</label>
            <input type="text" class="input" :placeholder="'Name'" v-model="fieldName">
          </div>
          <label class="label">Type of the content field</label>
          <div class="select">
            <select>
              <!-- Modal Slot - made for adding content type fields -->
              <slot>
                <option>There are no options</option>
              </slot>
            </select>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot" v-if="kind == 'logout'">
        <button class="button is-success" @click="$emit('confirmLogout')">Logout</button>
        <button class="button" @click="$emit('close')">Cancel</button>
      </footer>
      <footer class="modal-card-foot" v-else>
        <template v-if="kind == 'deletePage' || kind == 'deleteField' || kind == 'deleteSetting' || kind == 'deleteContent' || kind == 'bulkDeleteSelected'">
          <button class="button is-success" @click="deleteObj()">Confirm</button>
        </template>
        <template v-else>
          <button class="button is-success" @click="add()">Add</button>
        </template>
        <button class="button" @click="$emit('close')">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  data () {
    return {
      fieldName: '',
      pageName: '',
      settingName: ''
    }
  },
  methods: {
    add (event) {
      if (this.kind === 'addField') { this.$emit('addField', this.fieldName) }
      if (this.kind === 'addPage') { this.$emit('addPage', this.pageName) }
      if (this.kind === 'addSetting') { this.$emit('addSetting', this.settingName) }
    },
    deleteObj () {
      if (this.kind === 'deleteField') { this.$emit('confirmDeleteField') }
      if (this.kind === 'deletePage') { this.$emit('confirmDeletePage') }
      if (this.kind === 'deleteSetting') { this.$emit('confirmDeleteSetting') }
      if (this.kind === 'deleteContent') { this.$emit('confirmDeleteContent') }
      if (this.kind === 'bulkDeleteSelected') { this.$emit('selectBulkActions') }
    }
  },
  props: {
    header: {
      type: String,
      required: true,
      default: '!Error'
    },
    subHeader: {
      type: String,
      required: false,
      default: '!Error'
    },
    kind: {
      type: String
    }
  }
}
</script>
