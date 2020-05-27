<template>
  <div>
    <h1>¿Dónde buscas aparcamiento?</h1>

    <v-data-iterator
      hide-default-footer
      :search.sync="search"
      :page.sync="page"
      :sort-by="sortBy"
      :sort-desc="sortDesc"
      :items="garagesData"
      :items-per-page="itemsPerPage"
      no-results-text="No se encuentran resultados"
    >
      <template v-slot:header>
        <v-row>
          <v-col cols="6" sm="8">
            <search-location-bar
              class="mt-6 mb-3"
              @search="getSearch"
            ></search-location-bar>
          </v-col>

          <v-col cols="4" sm="3">
            <v-select
              v-model="sortBy"
              :items="itemKeys"
              :item-value="itemKeys.value"
              :item-text="itemKeys.text"
              flat
              prepend-inner-icon="mdi-filter-variant"
              label="Ordenar"
              class="mt-6 mb-3 ml-2"
            >
            </v-select>
          </v-col>

          <v-col cols="2" sm="1">
            <v-btn icon large class="mt-7 mb-2" @click="sortDesc = !sortDesc">
              <v-icon>{{ sortIcon }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </template>

      <template v-slot:default="props">
        <v-card
          color="transparent"
          flat
          width="100%"
          class="d-inline-flex flex-wrap justify-center"
        >
          <garage-card
            v-for="(garage, index) in props.items"
            :key="index"
            :garage="garage"
            class="ma-1"
          ></garage-card>
        </v-card>
      </template>

      <template v-slot:footer="props">
        <pagination
          v-if="props.pagination.pageCount > 1"
          :length="props.pagination.pageCount"
          class="ma-1"
          @page="getNumberPage"
        ></pagination>
      </template>
    </v-data-iterator>
  </div>
</template>

<script>
import GarageCard from '@/components/GarageCard.vue'
import Pagination from '@/components/Pagination.vue'
import SearchLocationBar from '@/components/SearchLocationBar'

export default {
  name: 'Search',
  middleware: 'auth',
  components: {
    SearchLocationBar,
    GarageCard,
    Pagination
  },
  asyncData({ $axios }) {
    return $axios.get(`${process.env.apiUrl}/garages`).then((response) => {
      return { garagesData: response.data }
    })
  },
  data() {
    return {
      search: '',
      sortBy: 'rating',
      sortDesc: true,
      itemKeys: [
        { text: 'Valoración', value: 'rating' },
        { text: 'Precio', value: 'unitPrice' },
        { text: 'Ubicación', value: 'location' }
      ],
      itemsPerPage: 9,
      page: 1
    }
  },
  computed: {
    sortIcon() {
      return this.sortDesc
        ? 'mdi-arrow-down-drop-circle-outline'
        : 'mdi-arrow-up-drop-circle-outline'
    }
  },
  methods: {
    getSearch(query) {
      this.search = query
    },
    getNumberPage(number) {
      this.page = number
    }
  },
  head() {
    return {
      title: 'Buscador de aparcamientos'
    }
  }
}
</script>
