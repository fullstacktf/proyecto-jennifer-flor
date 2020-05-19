<template>
  <v-card :width="width">
    <v-img height="200px" :src="garage.imagen"></v-img>
    <v-card-text class="pt-2">
      <v-rating
        :value="garage.rating"
        color="amber"
        dense
        half-increments
        readonly
        size="24"
        half-icon="mdi-star-half-full"
        class="d-inline"
      ></v-rating>
      <span class="caption mr-2"> ({{ garage.rating }}) </span>
    </v-card-text>
    <v-chip class="mx-2" small color="secondary">
      <v-icon small left>mdi-cash-multiple</v-icon>
      {{ garage.unitPrice }} €/hora
    </v-chip>
    <v-chip class="mx-1" small color="blue" dark> {{ garage.area }} m² </v-chip>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="title"
          >En {{ garage.location }}</v-list-item-title
        >
        <v-list-item-subtitle>{{ garage.description }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
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
