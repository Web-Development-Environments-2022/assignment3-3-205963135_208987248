<template>
  <div class="meal">
    <!-- <b-container fluid class="p-4 bg-light all_recipes"> -->
    <b-button
      class="all_btn_meal"
      pill
      variant="warning"
      @click="reorderMealRecipes"
      >Reorder Meal Recipes</b-button
    >
    <b-row class="row" v-for="(r, index1) in this.recipes" :key="index1">
      <b-container fluid class="p-4 bg-light all_recipes">
        <RecipePreview
          class="recipePreview"
          :recipe="r"
          :id="r.id"
          :title="r.title"
          :readyInMinutes="r.readyInMinutes"
          :image="r.image"
          :aggregateLikes="r.aggregateLikes"
          :isFavorite="r.isFavorite"
          :isLastseen="r.isLastseen"
          :index="index1 + 1"
        />
        <b-progress :max="totalSteps" variant="success" :striped="true"
          ><b-progress-bar :value="numOfStepsDone">
            <span
              >Progress:
              <strong
                >{{
                  this.progressBarData.find(
                    (element) => element.recipeId == r.id
                  ).done
                }}
                /
                {{
                  this.progressBarData.find(
                    (element) => element.recipeId == r.id
                  ).total
                }}</strong
              ></span
            >
          </b-progress-bar></b-progress
        >
        <b-button
          class="all_btn_meal"
          pill
          variant="warning"
          @click="() => deleteFromMeal(r)"
          >Delete From Meal</b-button
        >
      </b-container>
    </b-row>
    <!-- </b-container> -->
  </div>
</template>

<script>
import RecipePreview from "../components/RecipePreview.vue";
export default {
  name: "MealPage",
  components: {
    RecipePreview,
  },
  // async created() {
  //   console.log("MealPage created");
  //   await updateMeal();
  // },
  async mounted() {
    console.log("MealPage created");
    try {
      await this.updateMeal();
    } catch (err) {
      // console.log("error.response.status", err.response.status);
      console.log(err);
    }
    console.log("MealPage finished");
  },
  // async updated() {
  //   console.log("MealPage created");
  //   try {
  //     await this.updateMeal();
  //   } catch (err) {
  //     // console.log("error.response.status", err.response.status);
  //     console.log(err);
  //   }
  //   console.log("MealPage finished");
  // },
  data() {
    return {
      recipes: JSON.parse(sessionStorage.getItem("mealRecipes"))
        ? JSON.parse(sessionStorage.getItem("mealRecipes"))
        : [],
      progressBarData: [],

      // recipes: [],
    };
  },
  methods: {
    async updateMeal() {
      // console.log("updateMeal");
      this.recipes = JSON.parse(sessionStorage.getItem("mealRecipes"));
      // console.log(this.recipes);
      let instructionsLength = JSON.parse(
        sessionStorage.getItem("mealRecipesInstructionLength")
      );
      // console.log(instructionsLength);
      if (instructionsLength != undefined) {
        instructionsLength.forEach((element) => {
          let curObject = {};
          curObject.recipeId = element.recipeId;
          curObject.total = element.numberOfInstructions;
          curObject.done = 0;
          // console.log(curObject);
          this.progressBarData.push(curObject);
        });
      }
      // console.log(this.progressBarData);
      let curInstructions = JSON.parse(
        sessionStorage.getItem("curInstructions")
      );
      console.log(curInstructions);
      if (curInstructions != undefined) {
        let curObject = {};
        curInstructions.forEach((element) => {
          curObject.recipeId = element.recipeId;
          curObject.total = element.totalInstructions;
          curObject.done = element.finishedInstructions;
          const instructionIndex = this.progressBarData.findIndex(
            (o) => o.recipeId == element.recipeId
          );
          this.progressBarData[instructionIndex] = curObject;
        });
        console.log(this.progressBarData);
      }
      // let newRecipes = [];
      // this.recipes.forEach((recipe) => {
      //   let newRecipe = JSON.parse(JSON.stringify(recipe));
      //   newRecipes.push(newRecipe);
      // });
      // this.recipes = newRecipes;
      console.log(this.recipes);
    },
  },
};
</script>

<style>
.all_recipes {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}
::v-deep .all_btn_meal {
  color: rgb(0, 0, 0) !important;
  margin-left: 80px;
  position: relative;
  top: -225px;
  font-weight: bold;
}
</style>