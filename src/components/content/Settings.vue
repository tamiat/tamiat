<template>
  <div class="container settings">

    <h3 class="is-size-3">General settings</h3>
    <div class="box">
      <div class="columns">

        <div class="column is-multiline">

          <div v-for="(field, index) in fields" class="field columns" :key="index">
            <div class="column is-one-third">
              <label class="label is-capitalized">{{field.label}}</label>
            </div>

            <div class="control column is-two-thirds">
              <input type="text" class="input" :name="field.name" :placeholder="settings[field.name]" v-model="field.value">
            </div>
          </div>

          <button type="button" class="button is-info is-pulled-right" @click="saveSettings">
            Save Settings
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { settingsRef } from '../../config';

export default {
  data() {
    return {
      updatesCounter: 0,
      // this array contains settings form fields
      fields: [
        {
          label: 'Site Title',
          name: 'title',
          value: ''
        },
        {
          label: 'Site Description',
          name: 'description',
          value: ''
        }
      ]
    }
  },
  firebase: {
    // load settings as an object instead of array (default)
    settings: {
      source: settingsRef,
      asObject: true
    }
  },
  methods: {
    saveSettings() {
      // generate the new settings without updating the empty fields
      let updatedSettings = {
        title: this.fields[0].value || this.settings.title,
        description: this.fields[1].value || this.settings.description,
      }
      // save the new settings to firebase
      this.$firebaseRefs.settings.set(updatedSettings)
    },
    // display the loaded settings
    displaySettings() {
      for (let key in this.settings) {
        this.fields.map((field) => {
          if (field.name === key) {
            return field.value = this.settings[key];
          }
        })
      }
      // save the new settings to firebase
      this.$firebaseRefs.settings.set(updatedSettings)
    }
  },
  updated() {
    // run the loaded settings once
    if (this.updatesCounter === 0) {
      this.displaySettings();
    }
    this.updatesCounter++;
  }
}

</script>

<style lang="scss">
h3 {
  margin: 1em 1em 1em 0em;
}
</style>
