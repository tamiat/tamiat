<template>
  <div class="container settings" id="settings">

    <!-- notification -->
    <div v-if="notification.message" :class="'notification is-' + notification.type">
      <button class="delete" @click="hideNotifications"></button>{{notification.message}}
    </div>

    <h3 class="is-size-3">General settings</h3>
    <div class="box">
      <div class="columns">

        <div class="column is-multiline">

          <div v-for="(field, key) in settings" class="field columns" :key="key" v-if="key !== '.key'">
            <div class="column is-one-third">
              <span class="tag">
                {{key}}
                <button class="delete is-small" @click="deleteSettingsField(key)"></button>
              </span>
            </div>

            <div class="control column is-two-thirds">
              <input type="text" class="input" :name="field" :placeholder="field" v-model="settings[key]">
            </div>
          </div>
          <!-- Main container -->
          <nav class="level">
            <!-- Left side -->
            <div class="level-left">
              <!--<div class="level-item"></div>-->
            </div>
            <!-- Right side -->
            <div class="level-right">
              <div class="level-item">
                <button type="button" class="button is-pulled-right" @click="addSettingField">
                  Add Settings field
                </button>
              </div>
              <div class="level-item">
                <button type="button" class="button is-info is-pulled-right" @click="saveSettings">
                  Save Settings
                </button>
              </div>
            </div>
          </nav>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { settingsRef } from '../../../config';
import notifier from '../../../mixins/notifier';

export default {
  name: 'settings',
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
  mixins: [notifier],
  methods: {
    saveSettings() {
      delete this.settings['.key'] // This is a bit weird but no problem
      this.$firebaseRefs.settings.update(this.settings).then(() => {
        this.showNotification('success', 'Settings Successfully saved');
      })
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
    },
    addSettingField() {
      const newFieldName = prompt("Name for new setting:");
      if (this.settings.hasOwnProperty(newFieldName)) {
        alert('This setting already does exist')
        return
      }
      this.$firebaseRefs.settings.update({
        [newFieldName]: ''
      }).then(() => {
        this.showNotification('success', 'Setting Successfully added');
      }).catch(() => {
        this.showNotification('error', 'Setting not added');
      })
    },
    deleteSettingsField(key) {
      const name = prompt("Type the name of the setting to comfirm");
      if (key != name) {
        console.log(`${key} was not equal to ${name}`)
        alert('setting name did not match')
        return
      }
      this.$firebaseRefs.settings
        .child(key)
        .remove()
        .then(() => {
          this.showNotification('success', 'Setting successfully removed');
        })
        .catch((e) => {
          this.showNotification('error', 'Setting not removed');
        })
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
#settings {
  h3 {
    margin: 1em 1em 1em 0em;
  }
}
</style>
