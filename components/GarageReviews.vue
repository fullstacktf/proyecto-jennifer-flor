<template>
  <div>
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
              >Mario</v-list-item-title
            >
            <v-list-item-title>2020-03-23</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Muy bien</v-list-item-title>
            <v-list-item-subtitle
              >Buen trato con el dueño. Ningún problema.</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-rating
            value="5"
            color="amber"
            dense
            size="14"
            half-increments
            readonly
            half-icon="mdi-star-half-full"
            class="d-inline"
          ></v-rating>
        </v-list-item>
        <v-list-item>
          <v-list-item-avatar>
            <v-img
              src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">Ray</v-list-item-title>
            <v-list-item-title>2020-04-05</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Bien...</v-list-item-title>
            <v-list-item-subtitle
              >Dueños simpáticos aunque habia mucho polvo</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-rating
            value="4"
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
export default {
  props: {
    garage: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
