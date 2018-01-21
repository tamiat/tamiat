export default {
  data () {
    return {
      snackbar: false,
      snackMessage: ''
    }
  },
  methods: {
    snack (message) {
      this.snackMessage = message
      this.snackbar = true
    }
  }
}
