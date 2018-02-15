<template>
<div class="dropdown" :class="{'is-active': dropdownActive}" @click="toggleDropdown">
  <div class="dropdown-trigger">
    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
      <span>{{selectedElement.label}}</span>
      <span class="icon is-small">
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu" role="menu">
    <div class="dropdown-content">
      <a class="dropdown-item" v-if="option" v-for="(option, optionKey) in options" :key="optionKey" @click="selectOption(option)">
        {{option.label ? option.label : null }}
      </a>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'dropdown',
  data () {
    return {
      dropdownActive: false
    }
  },
  methods: {
    toggleDropdown () {
      this.dropdownActive = !this.dropdownActive
    },
    selectOption (option) {
      this.selectedElement.id = option.id
      this.selectedElement.label = option.label
      if (option.id === 'all' || option.id === 'none') {
        this.$emit('selectBulkActions')
      }
      if (option.id === 'newPage') {
        this.$emit('addNewPage')
      }
    }
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    selectedElement: {
      type: Object,
      required: true
    }
  }
}
</script>
