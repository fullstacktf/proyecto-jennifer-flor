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
        <v-card outlined min-width="600">
          <v-card-title>Consultar disponibilidad</v-card-title>
          <v-card-text>
            <p>Entrada</p>
            <div class="d-flex">
              <v-text-field
                outlined
                label="Fecha de entrada"
                append-icon="mdi-calendar"
                class="mr-2"
                v-on="on"
              ></v-text-field>
              <v-text-field
                outlined
                label="Hora de entrada"
                append-icon="mdi-timer-outline"
                v-on="on"
              ></v-text-field>
            </div>
            <p>Salida</p>
            <div class="d-flex">
              <v-text-field
                outlined
                label="Fecha de salida"
                append-icon="mdi-calendar"
                class="mr-2"
                v-on="on"
              ></v-text-field>
              <v-text-field
                outlined
                label="Hora de salida"
                append-icon="mdi-timer-outline"
                v-on="on"
              ></v-text-field>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn depressed color="accent">
              Consultar
            </v-btn>
          </v-card-actions>
        </v-card>
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
      garagesData
    }
  },
  computed: {
    garage() {
      return garagesData.filter((el) => {
        return el.id === parseInt(this.$route.params.id)
      })[0]
    }
  }
}
</script>
