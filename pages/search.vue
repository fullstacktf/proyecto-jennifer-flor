<template>
  <div>
    <v-form>
      <v-text-field v-model="search" label="Dirección"></v-text-field>
      <v-btn>Buscar</v-btn>
    </v-form>
    <garage-card
      v-for="(garage, index) in garagesData"
      :key="index"
      :garages="garage"
    ></garage-card>
    <pagination></pagination>
  </div>
</template>

<script>
import garagesData from '../assets/garages.json'
import GarageCard from '../components/GarageCard.vue'
import pagination from '../components/Pagination.vue'

export default {
  name: 'Search',
  components: {
    GarageCard,
    pagination
  },
  data() {
    return {
      search: '',
      garagesData
    }
  },
  head() {
    return {
      title: 'Buscador'
    }
  }
}
</script>
