<template>
  <div>
    <v-pagination v-model="page" :length="pageLength"></v-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pageLength: {
      type: String,
      default: '1'
    }
  }
}
</script>
