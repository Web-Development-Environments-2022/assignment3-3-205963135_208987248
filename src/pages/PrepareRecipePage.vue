<template>
  <div>
    <h1 class="title">Prepare Recipe Page</h1>
    <Ingredients :ingredients="recipe.ingredients"></Ingredients>
    <Instructions :instructions="recipe._instructions"></Instructions>
  </div>
</template>
<script>
import Ingredients from "../components/Ingredients.vue";
import Instructions from "../components/Instructions.vue";
export default {
  name: "PrepareRecipePage",
  components: {
    Ingredients,
    Instructions,
  },
  recipe: {
    type: Object,
    required: true,
  },
};
</script>

<style>
.title {
  text-align: center;
  margin-top: 20px;
}
</style>
