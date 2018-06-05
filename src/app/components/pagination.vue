<template>
  <div class="pagination-block">
    <ul class="pagination">
      <li :class="['navigation', previousPage ? '' : 'is-disabled']">
        <a @click="previousPage && pageChange(previousPage)">Back</a>
      </li>
      <li v-if="totalPages > 0" v-for="n in totalPages" :key="n" :class="[n === currentPage ? 'is-current' : '']">
        <a @click="pageChange(n)" v-text="n"></a>
      </li>
      <li :class="['navigation', nextPage ? '' : 'is-disabled']">
        <a @click="nextPage && pageChange(nextPage)">Next</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    totalItems: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  computed: {
    totalPages () {
      return this.perPage > 0 ? Math.ceil(this.totalItems / this.perPage) : 0
    },
    nextPage () {
      return this.totalPages && this.currentPage !== this.totalPages
        ? this.currentPage + 1 : null
    },
    previousPage () {
      return this.totalPages && this.currentPage > 1
        ? this.currentPage - 1 : null
    }
  },
  methods: {
    pageChange (toPage) {
      this.$emit('changePage', toPage)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';

.pagination {
  display: flex;
  li {
    margin: 0 5px;
    a {
      text-decoration: none;
      &:hover {
        background-color: $color-gray-light;
      }
    }
    &.is-current a {
      background-color: $color-blue-light;
      border: 1px solid $color-blue-light;
      color: #FFFFFF;
    }
    &.navigation {
      a {
        min-width: 70px;
        display: inline-block;
        padding: 10px;
        text-align: center;
        background-color: $color-blue;
        color: #FFFFFF;
        &:hover {
          background-color: $color-blue;
        }
      }
      &.is-disabled a {
        background-color: $color-black-light;
        color: #FFFFFF;
      }
    }
  }
  a {
    border: 1px solid $color-black-light;
    @include border-radius(5px);
    background-color: #FFFFFF;
    color: $primary-font-color;
    min-width: 50px;
    display: inline-block;
    text-align: center;
    padding: 10px;
  }
}
</style>
