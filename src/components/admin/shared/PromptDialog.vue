<template>
  <v-dialog v-model="dialog" persistent max-width="300px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ question }}</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex>
              <p class="subheading">{{ info }}</p>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="answer(false)">CANCEL</v-btn>
        <v-btn color="blue darken-1" flat @click="answer(true)">CONTINUE</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
    export default {
      data () {
        return {
          dialog: false,
          question: '',
          info: '',
          resolve: null
        }
      },
      methods: {
        ask (question, info) {
          this.question = question
          this.info = info
          this.dialog = true
          return new Promise((resolve, reject) => {
            this.resolve = resolve
          })
        },
        answer (a) {
          this.question = ''
          this.info = ''
          this.dialog = false
          this.resolve(a)
        }
      }
    }
</script>

<style lang="scss" scoped>

</style>
