<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <!-- <b-img :src="recipe.image" class="center" v-bind="mainProps" rounded="circle" alt="Circle image"></b-img> -->
        <img :src="recipe.image" class="center" border-radius="50%" />
      </div>
      <div class="recipe-body">
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
          </div>
          <!-- <div class="wrapped instructions">
            <h4 class="headers">Instructions:</h4>
            <ol>
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
          </div> -->
          <Instructions
            :Instructions="this.recipe._instructions"
            :prepared="false"
          ></Instructions>
        </div>
        <b-button
          class="all_btn"
          pill
          variant="outline-secondary"
          @click="setCurRecipe"
          ><router-link :to="{ name: 'PrepareRecipe' }"
            >Prepare Recipe</router-link
          ></b-button
        >
        <b-button
          v-if="this.$root.store.username != undefined"
          class="all_btn"
          pill
          variant="outline-secondary"
          @click="addToMeal"
          >Add to Meal</b-button
        >
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      > -->
    </div>
  </div>
</template>

<script>
// import Ingredients from "../components/Ingredients.vue";
import Instructions from "../components/Instructions.vue";
export default {
  name: "RecipeDetails",
  components: {
    // Ingredients,
    Instructions,
  },
  data() {
    return {
      recipe: undefined,
    };
  },
  methods: {
    setCurRecipe() {
      // this.$root.store.curRecipe = this.recipe;
      sessionStorage.setItem("curRecipe", JSON.stringify(this.recipe));
    },
    async addToMeal() {
      this.$root.store.server_domain = "http://127.0.0.1:3000";
      if (this.$root.store.username != undefined) {
        let userName = this.$root.store.username;
        let recipeId = this.recipe.id;
        const response = await this.axios.post(
          this.$root.store.server_domain + "/recipes/addmeal",
          {
            recipeId: recipeId,
            username: userName,
          }
        );
        if (response.data == "This recipe is already in the meal") {
          //show modal that says this recipe is already in the meal
        }
      }
    },
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;

      try {
        this.$root.store.server_domain = "http://127.0.0.1:3000";
        let userName = this.$root.store.username;
        if (userName == undefined) {
          userName = "guest";
        }
        response = await this.axios.post(
          // "https://test-for-3-2.herokuapp.com/recipes/info",
          this.$root.store.server_domain + "/recipes/details",
          {
            userName: userName,
            recipeId: this.$route.params.recipeId,
          }
          // {
          //   params: { id: this.$route.params.recipeId }
          // }
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
          // console.log(response.data);
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
            console.log(newLastSearch);
            sessionStorage.setItem(
              "searchResults",
              JSON.stringify(newLastSearch)
            );
          }
        }
        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log(error);
        console.log("error.response.status", error.response.status);
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
      } = response.data;
      let _instructions = analyzedInstructions
        .map((fstep) => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
        .reduce((a, b) => [...a, ...b], []);

      let _recipe = {
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
      // console.log(this.recipe);
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
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
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
/* .instructions {
  padding: 5px;
  border-radius: 10px;
  outline-style: dotted;
  height: 100%;
  width: 600px;
  margin-top: 100px;
} */
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
</style>
