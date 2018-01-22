<template>
  <div>
    <v-toolbar class="blue darken-1">
      <v-toolbar-title class="white--text">Setings</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="white blue--text" @click="dialog = true">Add setting</v-btn>
    </v-toolbar>
    <v-progress-linear v-if="loader" color="orange lighten-2" class="mb-2 mt-0" v-bind:indeterminate="true"></v-progress-linear>
    <v-container grid-list-md>
      <v-layout row>
        <v-flex md3 v-for="(field, key) in settings" :key="key" v-if="key !== '.key'">
          <v-card>
            <v-card-title class="headline">{{ key }}</v-card-title>
            <v-card-actions>
              <v-btn flat color="blue darken-1"
                     @click="deleteSettingsField(key)">Delete</v-btn>
            </v-card-actions>
            <div>
              <input :name="field" placeholder="Field" v-model="settings[key]">
            </div>
          </v-card>
        </v-flex>
      </v-layout>
      <v-btn color="blue darken-1" class="white--text" @click="saveSettings">
        Save Settings
      </v-btn>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Add setting</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex>
                  <v-text-field autofocus label="Setting name"
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
      <prompt-dialog ref="deleteDialog"></prompt-dialog>
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
import PromptDialog from '../shared/PromptDialog'

export default {
  components: { InfoDialog, PromptDialog },
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
        this.snack('Settings saved.');
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
          this.snack('Field added.')
        }).catch(() => {
          this.snack('Not added.')
        })
      }
    },
    deleteSettingsField(key) {
      this.$refs.deleteDialog.ask('Delete this field?', 'This action cannot be restored.')
        .then(answer => {
          if (answer) {
            this.$firebaseRefs.settings
              .child(key)
              .remove()
              .then(() => {
                this.snack('Field deleted.')
              })
              .catch((e) => {
                tthis.snack('Not removed.')
              })
          }
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
