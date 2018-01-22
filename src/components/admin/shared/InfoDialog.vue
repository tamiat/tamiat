<template>
  <v-dialog v-model="dialog" persistent max-width="300px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ info }}</span>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="dialog = false">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
    export default {
      data () {
        return {
          info: '',
          dialog: false
        }
      },
        methods: {
          open (info) {
            this.dialog = true
            this.info = info
          }
        }
    }
</script>

<style scoped>

</style>
