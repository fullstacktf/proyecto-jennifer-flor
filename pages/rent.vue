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
        max-width="380"
      >
        <v-list light color="secondary" class="pa-2">
          <v-btn
            depressed
            block
            class="text-right"
            nuxt
            :to="`/garage/${getGarageData(bookingGarage.garageId).id}`"
            >Ver ficha <v-icon right small>mdi-link-variant</v-icon></v-btn
          >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-uppercase title"
                >Entrada</v-list-item-title
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
                >Salida</v-list-item-title
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
            @click="confirmationMessage = true"
            >Anular reserva</v-btn
          >

          <v-dialog v-model="confirmationMessage" max-width="700">
            <v-card>
              <v-card-title class="headline"
                >¿Seguro que quieres anular tu reserva?</v-card-title
              >
              <v-card-subtitle class="subtitle-1 mt-1"
                >Si quieres borrar tu reserva escribe la palabra
                <strong>DELETE</strong> abajo.</v-card-subtitle
              >
              <v-form
                ref="deleteForm"
                v-model="validateDeleteForm"
                class="pa-2"
              >
                <v-text-field
                  :rules="deteleRules"
                  outlined
                  placeholder="DELETE"
                ></v-text-field>
              </v-form>
              <v-card-actions>
                <v-btn text color="accent" @click="confirmationMessage = false"
                  >Cancelar</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn
                  v-if="validateDeleteForm"
                  depressed
                  color="error"
                  @click="deleteBookingGarage(bookingGarage.id)"
                  >Anular reserva</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-spacer></v-spacer>
          <v-btn depressed color="success"
            ><v-icon right small>mdi-cash-multiple</v-icon> Check-in</v-btn
          >
        </v-card-actions>
      </v-card>
    </div>
    <v-alert
      v-if="bookingData.length === 0"
      max-width="600"
      border="top"
      colored-border
      type="info"
      elevation="1"
      class="mx-auto my-5"
    >
      Actualmente no tienes aparcamientos reservados. Puedes encontrar
      aparcamientos a través del
      <nuxt-link to="/search">buscador de nuestra aplicación</nuxt-link>.
    </v-alert>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
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
      deteleRules: [
        (v) => !!v || 'Requerido',
        (v) => v === 'DELETE' || 'Debes escribir DELETE en mayúsculas'
      ],
      validateDeleteForm: false,
      confirmationMessage: false
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
