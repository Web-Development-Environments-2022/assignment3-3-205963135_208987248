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
          class="instructions"
          :instructions="recipe._instructions"
          :prepared="true"
          :recipeId="recipe.id"
        ></Instructions>
      </div>
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
    newInstructions.totalInstructions = newInstructions.instructions.length;
    newInstructions.finishedInstructions = 0;
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
  margin-bottom: 50px;
}
.all_btn_prapare {
  /* margin-left: 50px !important; */
  color: rgb(255, 255, 255) !important;
  font-weight: bold !important;
  margin-top: 25px;
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
  /* margin-left: 50px; */
}
.ingredients {
  background-color: rgba(255, 228, 196, 0.418);
  padding: 5px;
  border-radius: 10px;
  width: 450px;
  /* margin-left: 50px; */
}
.prepare {
  display: flex;
  justify-content: center;
}
.instructions {
  /* display: flex; */
  margin-left: 500px;
  position: relative;
  top: -620px !important;
}
/* a {
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
}
a:hover {
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
} */
</style>
