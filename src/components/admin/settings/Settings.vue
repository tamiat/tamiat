<template>
  <div>
    <v-toolbar class="blue darken-1">
      <v-toolbar-title class="white--text">Setings</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="white blue--text" @click="dialog = true">Add field</v-btn>
    </v-toolbar>
    <v-progress-linear v-if="loader" color="orange lighten-2" class="mb-2 mt-0" v-bind:indeterminate="true"></v-progress-linear>
    <v-container>
      <v-layout>
        <div v-for="(field, key) in settings" :key="key" v-if="key !== '.key'">
          <div>
              <span>
                {{key}}
                <button @click="deleteSettingsField(key)">Delete</button>
              </span>
          </div>
          <div>
            <input type="text" class="input" :name="field" :placeholder="field" v-model="settings[key]">
          </div>
        </div>
        <button type="button" @click="saveSettings">
          Save Settings
        </button>
      </v-layout>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Add field</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex>
                  <v-text-field autofocus label="Field name"
                                required v-model="setting"
                                :error-messages="settingErrors"
                                @input="$v.setting.$touch()">
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="addSettingField">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <info-dialog ref="info"></info-dialog>
      <v-snackbar :timeout="5000" bottom right v-model="snackbar">
        {{ snackMessage }}
        <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
import { settingsRef } from '../../../config'
import snack from '../../../mixins/snack'
import InfoDialog from '../shared/InfoDialog'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  components: { InfoDialog },
  data() {
    return {
      loader: true,
      setting: '',
      dialog: false,
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
  validations: {
    setting: { required }
  },
  computed: {
    settingErrors () {
      if (this.$v.setting.$dirty && this.$v.setting.$error) {
        return [ 'Invalid field name' ]
      }
    }
  },
  firebase: {
    settings: {
      source: settingsRef,
      asObject: true,
      readyCallback: function () { this.loader = false }
    }
  },
  mixins: [ snack, validationMixin ],
  methods: {
    saveSettings() {
      delete this.settings['.key'] // This is a bit weird but no problem
      this.$firebaseRefs.settings.update(this.settings).then(() => {
        this.snack('Setting saved.');
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
      this.$v.$touch()
      if (!this.$v.$invalid) {
        if (this.settings.hasOwnProperty(this.setting)) {
          this.$refs.info.open('Property with this name already exists.')
          return
        }
        this.$firebaseRefs.settings.update({
          [this.setting]: ''
        }).then(() => {
          this.dialog = false
          this.snack('Setting added.')
        }).catch(() => {
          this.snack('Not added.')
        })
      }
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
          this.snack('Setting removed.')
        })
        .catch((e) => {
          tthis.snack('Not removed.')
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

<style lang="scss" scoped>

</style>
