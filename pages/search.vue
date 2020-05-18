<template>
  <div>
    <h1>¿Dónde buscas aparcamiento?</h1>
    <v-form class="my-8">
      <v-text-field
        v-model="search"
        outlined
        append-icon="mdi-magnify"
        clearable
        placeholder="Ejemplo: Santa Cruz de Tenerife"
        label="Localización"
      ></v-text-field>
    </v-form>
    <v-card
      color="transparent"
      flat
      class="d-inline-flex flex-wrap justify-center"
    >
      <garage-card
        v-for="(garage, index) in garagesData"
        :key="index"
        :garage="garage"
        class="ma-1"
      ></garage-card
    ></v-card>
    <pagination class="ma-1"></pagination>
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
