<template>
  <div>
    <v-card flat>
      <v-img :src="garage.imagen" aspect-ratio="2.7"></v-img>
    </v-card>

    <v-list two-line subheader class="pr-3">
      <v-subheader class="title mt-4">Descripción</v-subheader>
      <v-list-item>
        <v-list-item-content>
          {{ garage.description }}
        </v-list-item-content>
      </v-list-item>

      <div class="d-flex flex-column flex-md-row">
        <div>
          <v-chip class="ma-2 px-8" x-large color="primary">
            <v-icon left>mdi-cash-multiple</v-icon>
            {{ garage.unitPrice }} €/hora
          </v-chip>

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

        <garage-availibity
          :garage="garage"
          :not-allowed-dates="notAllowedDates"
          :booking-data="checksDates"
        ></garage-availibity>
      </div>
    </v-list>

    <garage-reviews :garage="garage"></garage-reviews>
  </div>
</template>

<script>
import GarageReviews from '@/components/GarageReviews'
import GarageAvailibity from '@/components/GarageAvailibity'

export default {
  name: 'Garage',
  components: {
    GarageReviews,
    GarageAvailibity
  },
  asyncData({ $axios, params, error }) {
    return Promise.all([
      $axios.get(`${process.env.apiUrl}/garages/${params.id}`),
      $axios.get(`${process.env.apiUrl}/bookingData?garageId=${params.id}`)
    ])
      .then(([resGarages, resDates]) => {
        const notAllowedDates = []
        const checksDates = []

        resDates.data.forEach((val) => {
          checksDates.push({
            startDate: val.startDate,
            startTime: parseInt(val.startTime.substr(0, 2)),
            endDate: val.endDate,
            endTime: parseInt(val.endTime.substr(0, 2))
          })
          let arrayRestrictedDates = []

          const date = new Date(val.startDate)

          const endDate = new Date(val.endDate)

          date.setDate(date.getDate() + 1)

          // eslint-disable-next-line no-unmodified-loop-condition
          while (date < endDate) {
            arrayRestrictedDates = [
              ...arrayRestrictedDates,
              new Date(date).toISOString().substr(0, 10)
            ]
            date.setDate(date.getDate() + 1)
          }

          arrayRestrictedDates.forEach((v) => {
            notAllowedDates.push(v)
          })
        })
        return {
          garage: resGarages.data,
          notAllowedDates,
          checksDates
        }
      })
      .catch((e) => {
        error({ statusCode: 404 })
      })
  }
}
</script>
