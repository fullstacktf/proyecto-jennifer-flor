<template>
  <div>
    <v-form ref="form" v-model="validForm">
      <v-card outlined min-width="600">
        <v-card-title>Consultar disponibilidad</v-card-title>
        {{ bookingData }}
        MIN START HOUR {{ getMinStartHour }} MIN END HOUR {{ getMinEndHour }}
        <v-card-text>
          <p>Selecciona el día o días para reservar</p>
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
                :error-messages="validateDates"
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
              :allowed-dates="allowedDates"
              no-title
              scrollable
              range
              locale="es"
              first-day-of-week="1"
            >
              <v-btn text color="error" @click="menuDate = false"
                >Cancelar</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn outlined color="success" @click="$refs.menuDate.save(date)"
                >Guardar</v-btn
              >
            </v-date-picker>
          </v-menu>

          <p>Selecciona las horas de entrada y salida</p>

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
                  :error-messages="validateStartHourAllowed"
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
                :min="getMinStartHour"
                :allowed-minutes="allowedMinutes"
                :allowed-hours="allowedStartHours"
              >
                <v-btn text color="error" @click="menuStartTime = false"
                  >Cancelar</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn
                  outlined
                  color="success"
                  @click="$refs.menuStartTime.save(startTime)"
                  >Guardar</v-btn
                >
              </v-time-picker>
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
                  :error-messages="validateEndHourAllowed"
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
                :min="getMinEndHour"
                :allowed-minutes="allowedMinutes"
                :allowed-hours="allowedEndHours"
              >
                <v-btn text color="error" @click="menuEndTime = false"
                  >Cancelar</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn
                  outlined
                  color="success"
                  @click="$refs.menuEndTime.save(endTime)"
                  >Guardar</v-btn
                >
              </v-time-picker>
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

          <v-dialog v-model="confirmationMessage" max-width="700">
            <v-card>
              <v-card-title class="headline"
                >¿Seguro que quieres reservar?</v-card-title
              >
              <v-card-subtitle class="subtitle-1 mt-1"
                >Revisa que estos datos sean correctos. Esto reservará tu
                aparcamiento, el pago se realizará cuando hagas el
                Check-In.</v-card-subtitle
              >

              <v-divider></v-divider>

              <div class="d-flex">
                <v-card-text class="title mt-3">
                  <v-icon left>mdi-arrow-right-bold</v-icon>
                  Entrada
                </v-card-text>

                <v-divider vertical></v-divider>

                <v-card-text class="title mt-3">
                  {{ date[0] }} a las {{ startTime }}
                </v-card-text>
              </div>

              <div class="d-flex">
                <v-card-text class="title">
                  <v-icon left>mdi-arrow-left-bold</v-icon>
                  Salida
                </v-card-text>

                <v-divider vertical></v-divider>

                <v-card-text class="title">
                  {{ date[1] }} a las {{ endTime }}
                </v-card-text>
              </div>

              <v-divider></v-divider>

              <v-card-text class="title mt-4">
                <v-icon left>mdi-map-marker</v-icon>
                Dirección: {{ garage.address }}
              </v-card-text>

              <v-divider></v-divider>

              <v-card-text class="display-1 text-right mt-4">
                Precio: {{ totalPrice }} €
              </v-card-text>

              <v-card-actions>
                <v-btn color="error" text @click="confirmationMessage = false">
                  Cerrar
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn color="success" depressed large @click="bookGarage">
                  <v-icon left>mdi-checkbox-marked</v-icon>Reservar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script>
let arrayDatesForVuetify = []
export default {
  name: 'GarageAvailibity',
  props: {
    garage: {
      type: Object,
      default: () => {}
    },
    notAllowedDates: {
      type: Array,
      default: () => []
    },
    bookingData: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
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
    getMinStartHour() {
      const horas =
        this.date[0] === new Date().toISOString().substr(0, 10)
          ? new Date().getHours() + 1
          : 0
      return `${horas}:00`
    },

    getMinEndHour() {
      return !this.date[1] ||
        this.date[1] === new Date().toISOString().substr(0, 10)
        ? this.getMinStartHour
        : '0:00'
    },

    validateStartHourAllowed() {
      const startTimeHourNumber = parseInt(this.startTime.substr(0, 2))
      const minHourNumber = parseInt(this.getMinStartHour.substr(0, 2))
      return (!this.allowedStartHours(startTimeHourNumber) ||
        startTimeHourNumber < minHourNumber) &&
        this.startTime !== ''
        ? 'Hora no disponible'
        : ''
    },

    validateEndHourAllowed() {
      const endTimeHourNumber = parseInt(this.endTime.substr(0, 2))
      const minHourNumber = parseInt(this.getMinEndHour.substr(0, 2))
      return (!this.allowedEndHours(endTimeHourNumber) ||
        endTimeHourNumber < minHourNumber) &&
        this.endTime !== ''
        ? 'Hora no disponible'
        : this.totalHours <= 0
        ? 'Valor mínimo 1 hora'
        : ''
    },

    validateDates() {
      if (!this.date[1]) return
      let datesSelected = []
      const startDate = new Date(this.date[0])
      const endDate = new Date(this.date[1])
      // eslint-disable-next-line no-unmodified-loop-condition
      while (startDate <= endDate) {
        datesSelected = [
          ...datesSelected,
          new Date(startDate).toISOString().substr(0, 10)
        ]
        startDate.setDate(startDate.getDate() + 1)
      }
      const intersection = datesSelected.filter((element) =>
        this.notAllowedDates.includes(element)
      )
      return intersection.length > 0
        ? 'Hay fechas seleccionadas no disponibles'
        : ''
    },

    dateFormatted() {
      return this.getDateFormatted()
    },

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

  created() {
    arrayDatesForVuetify = this.notAllowedDates
  },

  methods: {
    getDateFormatted() {
      this.date.sort()
      return this.date.join('   |   ')
    },

    allowedMinutes(min) {
      return min % 5 === 0
    },

    allowedStartHours(hour) {
      const indexDaySelected = this.bookingData.findIndex(
        (val) => val.startDate === this.date[0] || val.endDate === this.date[0]
      )
      if (indexDaySelected < 0) return true
      return this.getAllowedHour(indexDaySelected, hour, this.date[0])
    },

    allowedEndHours(hour) {
      const endDaySelected = !this.date[1] ? this.date[0] : this.date[1]
      const indexEndDaySelected = this.bookingData.findIndex(
        (element) =>
          element.startDate === endDaySelected ||
          element.endDate === endDaySelected
      )
      if (indexEndDaySelected < 0) return true
      return this.getAllowedHour(indexEndDaySelected, hour, endDaySelected)
    },

    getAllowedHour(index, hour, daySelected) {
      const endDate = this.bookingData[index].endDate
      const endHour = this.bookingData[index].endTime
      const startDate = this.bookingData[index].startDate
      const startHour = this.bookingData[index].startTime
      if (endDate === startDate)
        return !this.getHoursBetween(startHour, endHour).includes(hour)
      else {
        return endDate === daySelected
          ? !this.getHoursBetween(0, endHour).includes(hour)
          : !this.getHoursBetween(startHour, 24).includes(hour)
      }
    },

    getHoursBetween(startNum, endNum) {
      let arrayHours = []
      while (startNum <= endNum) {
        arrayHours = [...arrayHours, startNum]
        startNum += 1
      }
      return arrayHours
    },

    allowedDates(date) {
      return !arrayDatesForVuetify.includes(date)
    },

    checkBookingGarage() {
      if (!this.$refs.form.validate()) return
      this.confirmationMessage = true
    },

    async bookGarage() {
      if (!this.$refs.form.validate()) return
      if (!this.date[1]) this.date[1] = this.date[0]
      await this.$axios.post(`${process.env.apiUrl}/bookingData`, {
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
