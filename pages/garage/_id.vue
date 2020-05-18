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

        <garage-availibity :garage="garage"></garage-availibity>
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
    return $axios
      .get(`${process.env.apiUrl}/garages/${params.id}`)
      .then((res) => {
        return { garage: res.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'Este garage no existe' })
      })
  }
}
</script>
