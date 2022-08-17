<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" border-radius="50%" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="left-container-ingredients">
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
            <div class="buttons-container-ingredients">
            <b-button
              class="all_btn_recipe"
              pill
              variant="warning"
              @click="setCurRecipe"
              :disabled="!this.$root.store.username"
              ><router-link :to="{ name: 'PrepareRecipe' }"
                >Prepare Recipe</router-link
              ></b-button
            >
            <b-button
              class="all_btn_meal"
              pill
              variant="warning"
              @click="() => addToMeal(true)"
              :disabled="!this.$root.store.username"
              >Add to Meal</b-button
            >
            </div>
            </div>
            <Instructions
              class="instructions_preview"
              :Instructions="this.recipe._instructions"
              :prepared="false"
              :recipeId="recipe.id"
            ></Instructions>
          </div>
          <b-modal id="my-modal" v-model="modalShow">{{ message }}</b-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Instructions from "../components/Instructions.vue";
export default {
  name: "RecipeDetails",
  components: {
    Instructions,
  },
  data() {
    return {
      recipe: undefined,
      message: "",
      modalShow: false,
    };
  },
  methods: {
    setCurRecipe() {
      sessionStorage.setItem("curRecipe", JSON.stringify(this.recipe));
      this.addToMeal(false);
    },
    async addToMeal(showResponseModal) {
      try {
        this.$root.store.server_domain = "https://dm-recipes.cs.bgu.ac.il";
        if (this.$root.store.username != undefined) {
          let userName = this.$root.store.username;
          let recipeId = this.recipe.id;
          const response = await this.axios.post(
            this.$root.store.server_domain + "/recipes/addmeal",
            {
              recipeId: recipeId,
              userName: userName,
            }
          );
          if (response.data == "Recipe was added to meal successfully") {
            let numOfRecipesInMeal = JSON.parse(
              sessionStorage.getItem("recipesInMeal")
            );
            numOfRecipesInMeal += 1;
            sessionStorage.setItem(
              "recipesInMeal",
              JSON.stringify(numOfRecipesInMeal)
            );
            let newMeal = JSON.parse(sessionStorage.getItem("mealRecipes"));
            let newRecipe = await this.axios.post(
              this.$root.store.server_domain + "/recipes/previewDetails",
              { recipeIdList: [this.recipe.id] }
            );
            newMeal.push(newRecipe.data[0]);
            sessionStorage.setItem("mealRecipes", JSON.stringify(newMeal));
            let meal = await this.axios.post(
              this.$root.store.server_domain + "/recipes/meal",
              { userName: this.$root.store.username }
            );
            sessionStorage.setItem(
              "mealRecipesInstructionLength",
              JSON.stringify(meal.data)
            );
          }
          if (showResponseModal) {
            this.message = response.data;
            this.modalShow = true;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    try {
      let response;

      try {
        this.$root.store.server_domain = "https://dm-recipes.cs.bgu.ac.il";
        let userName = this.$root.store.username;
        if (userName == undefined) {
          userName = "guest";
        }
        response = await this.axios.post(
          this.$root.store.server_domain + "/recipes/details",
          {
            userName: userName,
            recipeId: this.$route.params.recipeId,
          }
        );
        if (this.$root.store.username != undefined) {
          let lastSeen = await this.axios.get(
            this.$root.store.server_domain + "/users/allwatched"
          );
          sessionStorage.setItem(
            "watchedRecipes",
            JSON.stringify(lastSeen.data.watched)
          );
          let lastSearch = JSON.parse(sessionStorage.getItem("searchResults"));
          if (lastSearch != undefined) {
            let newLastSearch = [];
            lastSearch.forEach((recipeList) => {
              let newRecipeList = [];
              recipeList.forEach((recipe) => {
                if (lastSeen.data.watched.includes(recipe.id.toString())) {
                  recipe.isLastseen = true;
                }
                newRecipeList.push(recipe);
              });
              newLastSearch.push(newRecipeList);
            });
            sessionStorage.setItem(
              "searchResults",
              JSON.stringify(newLastSearch)
            );
          }
        }
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log(error);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        analyzedInstructions,
        instructions,
        ingredients,
        popularity,
        readyInMinutes,
        image,
        title,
        servings,
        id,
      } = response.data;
      let _instructions = analyzedInstructions
        .map((fstep) => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
        .reduce((a, b) => [...a, ...b], []);

      let _recipe = {
        id,
        instructions,
        _instructions,
        analyzedInstructions,
        ingredients,
        popularity,
        readyInMinutes,
        image,
        title,
        servings,
      };

      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  display: flex;
  gap: 50px;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  margin-top: 50px;
}
.recipe-header {
  text-align: center;
}
.ingredients {
  background-color: rgba(255, 228, 196, 0.418);
  padding: 5px;
  border-radius: 10px;
  width: 450px;
  margin-left: 50px;
}
.instructions_preview {
  display: block;
}
.headers {
  text-align: center;
}
.mb-3 {
  background-color: rgba(240, 149, 14, 0.418);
  padding: 5px;
  border-radius: 10px;
  height: 85px;
  width: 200px;
  margin-left: 50px;
}

.all_btn_recipe {
  margin-left: 100px;
  margin-top: 25px;
}

.all_btn_meal {
  margin-left: 80px;
  top: -225px;
  font-weight: bold;
  margin-top: 25px;
}
a {
  color: #000000;
  text-decoration: none;
  font-weight: bold;
}
a:hover {
  color: #000000;
  text-decoration: none;
  font-weight: bold;
}
</style>
