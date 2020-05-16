<template>
  <div>
    <h1>Datos de tus reservas</h1>
    <v-card v-if="isStarted" flat class="counter mx-auto"
      >TIEMPO QUE QUEDA</v-card
    >
    <div class="d-flex flex-wrap">
      <v-card
        v-for="(bookingGarage, index) in bookingData"
        :key="index"
        class="mx-2 mt-2"
      >
        <v-list dark color="accent">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-uppercase title"
                >Inicio</v-list-item-title
              >
              <v-list-item-subtitle class="subtitle-1">
                {{ bookingGarage.startDate }}
              </v-list-item-subtitle>
              <v-list-item-subtitle class="subtitle-1">
                {{ bookingGarage.startTime }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title class="text-uppercase title"
                >Fin</v-list-item-title
              >
              <v-list-item-subtitle class="subtitle-1">
                {{ bookingGarage.endDate }}
              </v-list-item-subtitle>
              <v-list-item-subtitle class="subtitle-1">
                {{ bookingGarage.endTime }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list two-line subheader>
          <v-subheader class="title">Datos del aparcamiento</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Dirección</v-list-item-title>
              <v-list-item-subtitle>
                {{ getGarageData(bookingGarage.garageId).address }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Dimensiones</v-list-item-title>
              <v-list-item-subtitle>
                Área: {{ getGarageData(bookingGarage.garageId).area }} m² /
                Altura máx: {{ getGarageData(bookingGarage.garageId).height }} m
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Propietario</v-list-item-title>
              <v-list-item-subtitle>
                {{ getGarageData(bookingGarage.garageId).owner }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list>
          <v-list-item class="d-flex flex-column flex-md-row">
            <v-list-item-content>
              <v-list-item-title class="text-uppercase title"
                >Precio</v-list-item-title
              >
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-subtitle>
                {{ getGarageData(bookingGarage.garageId).unitPrice }} €/hora
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold title">
                {{ bookingGarage.totalPrice }} €
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-card-actions>
          <v-btn
            depressed
            outlined
            color="error"
            @click="deleteBookingGarage(bookingGarage.id)"
            >Anular reserva</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn depressed color="success">Check-in</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
// import userData from '@/assets/userdata.json'
// import garagesData from '@/assets/garages.json'
export default {
  asyncData({ $axios, params }) {
    return Promise.all([
      $axios.get(`${process.env.apiUrl}/bookingData`),
      $axios.get(`${process.env.apiUrl}/garages`)
    ]).then(([resBooking, resGarages]) => {
      resBooking.data.sort((a, b) => {
        if (a.startDate > b.startDate) return 1
        if (b.startDate > a.startDate) return -1
        return 0
      })
      return { bookingData: resBooking.data, garagesData: resGarages.data }
    })
  },
  data() {
    return {
      // userData,
      // garagesData
    }
  },
  computed: {
    isStarted() {
      return false
    }
  },
  methods: {
    getGarageData(id) {
      const garage = this.garagesData.filter((el) => {
        return el.id === id
      })
      return garage[0]
    },
    async deleteBookingGarage(id) {
      await this.$axios.delete(`${process.env.apiUrl}/bookingData/${id}`)
      this.$router.go()
    }
  },
  head() {
    return {
      title: 'Reservas'
    }
  }
}
</script>

<style></style>
