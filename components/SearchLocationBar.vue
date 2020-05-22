<template>
  <div>
    <v-text-field
      v-model="search"
      clearable
      type="text"
      outlined
      prepend-inner-icon="mdi-magnify"
      placeholder="Ejemplo: Santa Cruz de Tenerife"
      label="Ubicación"
      :loading="isLoading"
      @click:clear="$emit('search', '')"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  name: 'SearchLocationBar',
  data() {
    return {
      search: '',
      isLoading: false
    }
  },
  watch: {
    search(val) {
      if (val === null) return
      if (val.length < 3) return
      val && val !== this.searchedItem && this.querySelections(val)
    }
  },
  methods: {
    querySelections(val) {
      this.isLoading = true
      this.isLoading = 'secondary'
      setTimeout(() => {
        this.$emit('search', val)
        this.isLoading = false
      }, 1000)
    }
  }
}
</script>

<style></style>
