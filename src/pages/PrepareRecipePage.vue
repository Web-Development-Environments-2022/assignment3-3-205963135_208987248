<template>
  <div>
    <h1 class="title">Prepare Recipe Page</h1>
    <div class="wrapper">
      <div class="wrapped">
        <div class="mb-3">
          <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
          <div>Likes: {{ recipe.popularity }} likes</div>
          <div>{{ recipe.servings }} servings</div>
        </div>
        <div class="ingredients">
          <h4>Ingredients:</h4>
          <ul>
            <li
              v-for="(r, index) in recipe.ingredients"
              :key="index + '_' + r.id"
            >
              {{ r.original }}
            </li>
          </ul>
        </div>
        <b-button
          class="all_btn"
          @click="doubleIngredients"
          pill
          variant="outline-secondary"
          >Double Ingredients</b-button
        >
      </div>
      <Instructions
        :instructions="recipe._instructions"
        :prepared="true"
        :recipeId="recipe.id"
      ></Instructions>
    </div>
  </div>
</template>
<script>
// import Ingredients from "../components/Ingredients.vue";
import Instructions from "../components/Instructions.vue";
export default {
  name: "PrepareRecipePage",
  components: {
    // Ingredients,
    Instructions,
  },
  created() {
    this.recipe = JSON.parse(sessionStorage.getItem("curRecipe"));
    let newInstructions = [];
    this.recipe._instructions.forEach((instruction) => {
      instruction.checked =
        instruction.checked != undefined ? instruction.checked : false;
      newInstructions.push(instruction);
    });
    this.recipe._instructions = newInstructions;
    let curInstructions = JSON.parse(sessionStorage.getItem("curInstructions"));
    // console.log(this.recipe);
    if (curInstructions == undefined) {
      sessionStorage.setItem(
        "curInstructions",
        JSON.stringify([
          { instructions: this.recipe._instructions, recipeId: this.recipe.id },
        ])
      );
    } else {
      const instructionIndex = curInstructions.findIndex(
        (o) => o.recipeId == this.recipe.id
      );
      if (instructionIndex == -1) {
        curInstructions.push({
          instructions: this.recipe._instructions,
          recipeId: this.recipe.id,
        });
        sessionStorage.setItem(
          "curInstructions",
          JSON.stringify(curInstructions)
        );
      }
    }
  },
  mounted() {
    this.recipe = JSON.parse(sessionStorage.getItem("curRecipe"));
  },
  data() {
    return {
      recipe: { ingredients: [] },
    };
  },
  methods: {
    doubleIngredients() {
      // console.log(this.recipe);
      let newIngredients = [];
      this.recipe.ingredients.forEach((ingredient) => {
        let newIngredient = JSON.parse(JSON.stringify(ingredient));
        newIngredient.amount = newIngredient.amount * 2;
        newIngredient.original =
          newIngredient.amount + " " + newIngredient.originalName;
        newIngredients.push(newIngredient);
        // console.log(newIngredient);
      });
      this.recipe.ingredients = newIngredients;
      this.recipe.servings *= 2;
      this.$root.store.curRecipe = this.recipe;
    },
  },
};
</script>

<style>
.title {
  text-align: center;
  margin-top: 20px;
}
.all_btn {
  color: black !important;
  margin-top: 20px;
}
.wrapped {
  width: 50%;
}
.mb-3 {
  background-color: rgba(240, 149, 14, 0.418);
  padding: 5px;
  border-radius: 10px;
  height: 85px;
  width: 200px;
  margin-left: 50px;
}
.ingredients {
  background-color: rgba(255, 228, 196, 0.418);
  padding: 5px;
  border-radius: 10px;
  width: 450px;
  margin-left: 50px;
}
.wrapper {
  display: flex;
}
</style>
