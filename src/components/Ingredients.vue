<template>
  <div class="ingredients">
    <h4>Ingredients:</h4>
    <ul>
      <li v-for="(r, index) in this.ingredients" :key="index + '_' + r.id">
        {{ r.original }}
      </li>
    </ul>
    <b-button
      v-if="showButton"
      class="all_btn"
      @click="doubleIngredients"
      pill
      variant="outline-secondary"
      >Double Ingredients</b-button
    >
  </div>
</template>

<script>
export default {
  name: "Ingredients",
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
    showButton: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    doubleIngredients() {
      let newIngredients = [];
      this.ingredients.forEach((ingredient) => {
        let newIngredient = JSON.parse(JSON.stringify(ingredient));
        newIngredient.original = newIngredient.original * 2;
        newIngredients.push(newIngredient);
      });
      this.ingredients = newIngredients;
    },
  },
};
</script>

<style>
.ingredients {
  background-color: rgba(255, 228, 196, 0.418);
  padding: 5px;
  border-radius: 10px;
  width: 450px;
  margin-left: 50px;
}

::v-deep .all_btn {
  color: aliceblue;
}
</style>