<template>
  <v-card color="brown lighten-5" :width="width">
    <v-img height="200px" :src="garage.imagen"></v-img>
    <!-- <v-card-title>{{ garage.location }}</v-card-title> -->
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="title">{{
          garage.location
        }}</v-list-item-title>
        <v-list-item-subtitle>{{ garage.description }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-chip class="mx-2" small color="secondary">
      <v-icon small left>mdi-cash-multiple</v-icon>
      {{ garage.unitPrice }} €/hora
    </v-chip>
    <v-chip class="mx-1" small color="blue" dark> {{ garage.area }} m² </v-chip>
    <v-card-text class="pa-4">
      <v-rating
        :value="garage.rating"
        color="amber"
        dense
        half-increments
        readonly
        size="16"
        half-icon="mdi-star-half-full"
        class="d-inline"
      ></v-rating>
      <span class="caption mr-2"> ({{ garage.rating }}) </span>
    </v-card-text>
    <v-card-actions>
      <v-btn outlined depressed nuxt :to="`garage/${garage.id}`">Mostrar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'GarageCard',
  props: {
    garage: {
      type: Object,
      default: () => {}
    },
    width: {
      type: Number,
      default: 364
    }
  }
}
</script>
