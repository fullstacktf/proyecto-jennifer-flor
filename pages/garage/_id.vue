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
        </div>
        <v-spacer></v-spacer>
        <v-form ref="form">
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
                <v-card-title v-if="showPrice">
                  Precio total:
                  <span class="display-1">{{ totalPrice }} €</span>
                </v-card-title>
                <v-card-subtitle v-if="showPrice"
                  >{{ totalHours }} horas ({{
                    garage.unitPrice
                  }}€/hora)</v-card-subtitle
                >
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn depressed color="accent" @click="checkPrice">
                Consultar
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn v-if="showPrice" depressed color="success" large>
                <v-icon>mdi-car</v-icon> Reservar
              </v-btn>
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
import garagesData from '@/assets/garages.json'
export default {
  name: 'Garage',
  data() {
    return {
      garagesData,
      date: [new Date().toISOString().substr(0, 10)],
      startTime: '', // new Date().toISOString().substr(11, 5),
      endTime: '', // new Date().toISOString().substr(11, 5),
      rules: [(v) => !!v || 'Requerido'],
      menuDate: false,
      menuStartTime: false,
      menuEndTime: false,
      showPrice: false
    }
  },
  computed: {
    dateFormatted() {
      return this.getDateFormatted()
    },
    garage() {
      return garagesData.filter((el) => {
        return el.id === parseInt(this.$route.params.id)
      })[0]
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
  methods: {
    getDateFormatted() {
      this.date.sort()
      return this.date.join('   |   ')
    },
    allowedMinutes: (min) => min % 5 === 0,
    checkPrice() {
      if (this.$refs.form.validate()) this.showPrice = true
    }
  }
}
</script>
