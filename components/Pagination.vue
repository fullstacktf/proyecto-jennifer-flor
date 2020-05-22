<template>
  <div>
    <v-pagination
      v-model="page"
      :length="length"
      :total-visible="7"
      circle
      @input="click"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    length: {
      type: Number,
      default: 1
    },
    page: {
      type: Number,
      default: 1
    }
  },
  methods: {
    click() {
      this.$emit('page', this.page)
    }
  }
}
</script>
