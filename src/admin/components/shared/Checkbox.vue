<template>
<label>
  <input type="checkbox" :checked="value" :disabled="disabled" @change="updateCheckbox">
  <span>{{ label }}</span>
</label>
</template>
<script>
export default {
  name: 'checkbox',
  props: {
    value: {
      type: Boolean,
      required: false,
      default: false
    },
    label: {
      type: String,
      required: false,
      default: ''
    },
    disabled: {
      type: Boolean
    }
  },
  methods: {
    updateCheckbox (event) {
      this.$emit('input', event.target.checked)
      this.$emit('checked', this.checked)
    }
  }
}
</script>
<style lang="scss">
input[type=checkbox] {
     position: relative;
     cursor: pointer;
}
/* to hide the checkbox itself */
 label>input[type=checkbox]:before {
  position: absolute;
  background-color: #FFFFFF;
  height: 100%;
  width: 100%;
  font-family: FontAwesome;
  display: inline-block;
  content:"\f096";
  letter-spacing: 10px;
}
/* space between checkbox and label */
 label>input[type=checkbox]:checked:before {
  font-family: FontAwesome;
  display: inline-block;
  content:"\f046";
  letter-spacing: 5px;
}
 label>input[type=checkbox]:disabled:before {
  color: rgb(197, 194, 194);
}
</style>
