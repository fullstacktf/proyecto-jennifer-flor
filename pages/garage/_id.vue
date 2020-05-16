<template>
  <div>
    <v-img :src="garage.imagen" aspect-ratio="2.7"></v-img>
    <v-list two-line subheader>
      <v-subheader class="title mt-4">Descripción</v-subheader>
      <v-list-item>
        <v-list-item-content>
          {{ garage.description }}
        </v-list-item-content>
      </v-list-item>
      <div class="d-flex flex-column flex-md-row">
        <div>
          <v-subheader class="title">Datos del aparcamiento</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Localización</v-list-item-title>
              <v-list-item-subtitle>
                {{ garage.location }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Dirección</v-list-item-title>
              <v-list-item-subtitle>
                {{ garage.address }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Dimensiones</v-list-item-title>
              <v-list-item-subtitle>
                Área: {{ garage.area }} m² / Altura máx: {{ garage.height }} m
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Propietario</v-list-item-title>
              <v-list-item-subtitle>
                {{ garage.owner }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-chip class="ma-2 px-8" x-large color="secondary">
            <v-icon left>mdi-cash-multiple</v-icon>
            {{ garage.unitPrice }} €/hora
          </v-chip>
        </div>
        <v-spacer></v-spacer>
        <v-form ref="form" v-model="validForm">
          <v-card outlined min-width="600">
            <v-card-title>Consultar disponibilidad</v-card-title>
            <v-card-text>
              <p>Selecciona las fechas</p>
              <v-menu
                ref="menuDate"
                v-model="menuDate"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                min-width="290px"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :value="dateFormatted"
                    :rules="rules"
                    outlined
                    label="Entrada | Salida"
                    append-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  :min="new Date().toISOString()"
                  no-title
                  scrollable
                  range
                  locale="es"
                  first-day-of-week="1"
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menuDate = false"
                    >Cancelar</v-btn
                  >
                  <v-btn text color="primary" @click="$refs.menuDate.save(date)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
              <p>Selecciona las horas</p>
              <div class="d-flex">
                <v-menu
                  ref="menuStartTime"
                  v-model="menuStartTime"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="startTime"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      outlined
                      :value="startTime"
                      :rules="rules"
                      label="Hora de entrada"
                      prepend-inner-icon="mdi-timer-outline"
                      class="mr-2"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-model="startTime"
                    format="24hr"
                    scrollable
                    :allowed-minutes="allowedMinutes"
                    @click:minute="$refs.menuStartTime.save(startTime)"
                  ></v-time-picker>
                </v-menu>
                <v-menu
                  ref="menuEndTime"
                  v-model="menuEndTime"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="menuEndTime"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      :value="endTime"
                      :rules="rules"
                      :error-messages="timeAllowed"
                      outlined
                      label="Hora de salida"
                      append-icon="mdi-timer-outline"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-model="endTime"
                    format="24hr"
                    scrollable
                    :allowed-minutes="allowedMinutes"
                    @click:minute="$refs.menuEndTime.save(endTime)"
                  ></v-time-picker>
                </v-menu>
              </div>
              <div class="d-flex flex-column align-end justify-end">
                <v-card-title v-if="validForm">
                  Precio total:
                  <span class="display-1">{{ totalPrice }} €</span>
                </v-card-title>
                <v-card-subtitle v-if="validForm"
                  >{{ totalHours }} horas ({{
                    garage.unitPrice
                  }}€/hora)</v-card-subtitle
                >
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                v-if="validForm"
                depressed
                color="success"
                large
                @click="checkBookingGarage"
              >
                <v-icon>mdi-car</v-icon> Reservar
              </v-btn>
              <v-dialog v-model="confirmationMessage">
                <v-card>
                  <v-card-title class="headline"
                    >¿Seguro que quieres reservar?</v-card-title
                  >
                  <v-card-subtitle class="subtitle-1 mt-1"
                    >Revisa que estos datos sean correctos</v-card-subtitle
                  >

                  <v-card-text class="headline">
                    <v-icon left>mdi-arrow-right-bold</v-icon>
                    Entrada: {{ date[0] }} a las {{ startTime }}
                  </v-card-text>
                  <v-card-text class="headline">
                    <v-icon left>mdi-arrow-left-bold</v-icon>
                    Salida:
                    {{ date[1] }} a las {{ endTime }}
                  </v-card-text>
                  <v-card-text class="display-1 text-right">
                    Precio: {{ totalPrice }} €
                  </v-card-text>

                  <v-card-actions>
                    <v-btn
                      color="error"
                      text
                      @click="confirmationMessage = false"
                    >
                      Cancelar
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="success" outlined @click="bookingGarage">
                      Reservar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-form>
      </div>
    </v-list>
    <v-card flat class="my-8 pa-4">
      <v-card-title class="text-uppercase display-1">Reseñas</v-card-title>
      <v-rating
        :value="garage.rating"
        color="amber"
        half-increments
        readonly
        half-icon="mdi-star-half-full"
        class="d-inline-block mb-4"
      ></v-rating>
      <span class="subtitle mr-2"> ({{ garage.rating }}) </span>
      <v-divider></v-divider>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold"
              >Nombre</v-list-item-title
            >
            <v-list-item-title>Fecha</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Super guay</v-list-item-title>
            <v-list-item-subtitle>Todo maravilloso</v-list-item-subtitle>
          </v-list-item-content>
          <v-rating
            :value="garage.rating"
            color="amber"
            dense
            size="14"
            half-increments
            readonly
            half-icon="mdi-star-half-full"
            class="d-inline"
          ></v-rating>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
// import garagesData from '@/assets/garages.json'
export default {
  name: 'Garage',
  asyncData({ $axios, params, error }) {
    return $axios
      .get(`http://localhost:3001/garages/${params.id}`)
      .then((res) => {
        return { garage: res.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'Este garage no existe' })
      })
  },
  data() {
    return {
      // garagesData,
      garage: '',
      date: [new Date().toISOString().substr(0, 10)],
      startTime: '',
      endTime: '',
      rules: [(v) => !!v || 'Requerido'],
      menuDate: false,
      menuStartTime: false,
      menuEndTime: false,
      confirmationMessage: false,
      showPrice: false,
      validForm: false
    }
  },
  computed: {
    timeAllowed() {
      const error =
        !this.date[1] && this.totalHours <= 0 ? 'Valor mínimo 1 hora' : ''
      return error
    },
    dateFormatted() {
      return this.getDateFormatted()
    },
    // garage() {
    //   return this.garageData.id
    //   // return this.garagesData.filter((el) => {
    //   //   return el.id === parseInt(this.$route.params.id)
    //   // })[0]
    // },
    totalHours() {
      const firstDay = parseInt(this.date[0].substr(7, 8))
      const secondDay = this.date[1]
        ? parseInt(this.date[1].substr(7, 8))
        : firstDay
      const startHour =
        this.startTime === null ? 0 : parseInt(this.startTime.substr(0, 2))
      const endHour =
        this.endTime === null ? 0 : parseInt(this.endTime.substr(0, 2))
      return Math.abs(secondDay - firstDay) * 24 - startHour + endHour
    },
    totalPrice() {
      return this.garage.unitPrice * this.totalHours
    }
  },
  methods: {
    getDateFormatted() {
      this.date.sort()
      return this.date.join('   |   ')
    },
    allowedMinutes: (min) => min % 5 === 0,
    checkBookingGarage() {
      if (!this.$refs.form.validate()) return
      this.confirmationMessage = true
    },
    async bookingGarage() {
      if (!this.$refs.form.validate()) return
      if (!this.date[1]) this.date[1] = this.date[0]
      await this.$axios.post(`http://localhost:3001/bookingData`, {
        userId: 1,
        garageId: this.garage.id,
        checkIn: false,
        startDate: this.date[0],
        startTime: this.startTime,
        endDate: this.date[1],
        endTime: this.endTime,
        totalPrice: this.totalPrice
      })
      this.confirmationMessage = false
      this.$refs.form.reset()
      this.$router.push('/rent')
    }
  }
}
</script>
