<template>
  <div>
    <h1 class="title">Prepare Recipe Page</h1>
    <div class="wrapper prepare">
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
          class="all_btn_prapare"
          @click="doubleIngredients"
          pill
          variant="dark"
          >Double Ingredients</b-button
        >
        <Instructions
          class="instructions_prepare"
          :instructions="recipe._instructions"
          :prepared="true"
          :recipeId="recipe.id"
        ></Instructions>
      </div>
    </div>
  </div>
</template>
<script>
import Instructions from "../components/Instructions.vue";
export default {
  name: "PrepareRecipePage",
  components: {
    Instructions,
  },
  created() {
    this.updateRecipeAndInstructions();
  },
  mounted() {
    this.updateRecipeAndInstructions();
  },
  data() {
    return {
      recipe: { ingredients: [], recipeId: undefined },
    };
  },
  methods: {
    updateRecipeAndInstructions() {
      try {
        this.recipe = JSON.parse(sessionStorage.getItem("curRecipe"));
        let newInstructions = [];
        let counter = 0;
        this.recipe._instructions.forEach((instruction) => {
          instruction.checked =
            instruction.checked != undefined ? instruction.checked : false;
          newInstructions.push(instruction);
          if (instruction.checked) {
            counter++;
          }
        });
        this.recipe._instructions = newInstructions;
        sessionStorage.setItem("curRecipe", JSON.stringify(this.recipe));

        let curInstructions = JSON.parse(
          sessionStorage.getItem("curInstructions")
        );
        if (curInstructions == undefined) {
          sessionStorage.setItem(
            "curInstructions",
            JSON.stringify([
              {
                instructions: this.recipe._instructions,
                recipeId: this.recipe.id,
                totalInstructions: newInstructions.length,
                finishedInstructions: counter,
              },
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
              totalInstructions: newInstructions.length,
              finishedInstructions: counter,
            });
            sessionStorage.setItem(
              "curInstructions",
              JSON.stringify(curInstructions)
            );
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    doubleIngredients() {
      let newIngredients = [];
      this.recipe.ingredients.forEach((ingredient) => {
        let newIngredient = JSON.parse(JSON.stringify(ingredient));
        newIngredient.amount = newIngredient.amount * 2;
        newIngredient.original =
          newIngredient.amount +
          " " +
          newIngredient.unit +
          " " +
          newIngredient.originalName;
        newIngredients.push(newIngredient);
      });
      this.recipe.ingredients = newIngredients;
      this.recipe.servings *= 2;
    },
  },
};
</script>

<style>
.title {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 50px;
}
.all_btn_prapare {
  color: rgb(255, 255, 255) !important;
  font-weight: bold !important;
  margin-top: 25px;
}
.mb-3 {
  background-color: rgba(240, 149, 14, 0.418);
  padding: 5px;
  border-radius: 10px;
  height: 85px;
  width: 200px;
}
.ingredients {
  background-color: rgba(255, 228, 196, 0.418);
  padding: 5px;
  border-radius: 10px;
  width: 450px;
}
.prepare {
  display: flex;
  justify-content: center;
}
.instructions_prepare {
  margin-left: 500px;
  position: relative;
  top: -550px !important;
}
</style>
