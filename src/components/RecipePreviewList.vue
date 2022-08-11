<template>
  <b-container>
    <h3 class="title">
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row class="recipes-container">
      <b-col v-for="r in recipes" :key="r.id">
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
        />
      </b-col>
    </b-row>
    <b-button class="more_btn" @click="updateRecipes" variant="dark"
      >More Recipe</b-button
    >
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    listType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        // this.$root.store.server_domain = "http://127.0.0.1:3000";
        this.$root.store.server_domain = "https://dm-recipes.cs.bgu.ac.il:443";
        let response;
        if (this.listType == "RandomRecipes") {
          response = await this.axios.get(
            this.$root.store.server_domain + "/recipes/random"
            // "https://test-for-3-2.herokuapp.com/recipes/random"
          );
        } else if (this.listType == "MyRecipes") {
          response = await this.axios.get(
            this.$root.store.server_domain + "/users/my"
            // "https://test-for-3-2.herokuapp.com/recipes/random"
          );
        } else if (this.listType == "MyFamilyRecipes") {
          response = await this.axios.get(
            this.$root.store.server_domain + "/users/family"
            // "https://test-for-3-2.herokuapp.com/recipes/random"
          );
        } else if (this.listType == "MyFavoriteRecipes") {
          response = await this.axios.get(
            this.$root.store.server_domain + "/users/favorites"
            // "https://test-for-3-2.herokuapp.com/recipes/random"
          );
        }
        const resultsRecipes = response.data;
        this.recipes = resultsRecipes;
        // this.recipes = [
        //   {
        //     id: 661188,
        //     title: "Spicy Seasoned Loaded Guacamole",
        //     image: "https://spoonacular.com/recipeImages/661188-556x370.jpg",
        //     readyInMinutes: 45,
        //     popularity: 47,
        //     vegan: true,
        //     vegetarian: true,
        //     glutenFree: true,
        //   },
        //   // {
        //   //   id: 641308,
        //   //   title: "Decadent Black Forest Cake",
        //   //   image: "https://spoonacular.com/recipeImages/641308-556x370.jpg",
        //   //   readyInMinutes: 45,
        //   //   popularity: 44,
        //   //   vegan: false,
        //   //   vegetarian: false,
        //   //   glutenFree: false,
        //   // },
        //   // {
        //   //   id: 716297,
        //   //   title: "Breaded Shrimp and Spicy Mayo Appetizer",
        //   //   image: "https://spoonacular.com/recipeImages/716297-556x370.jpg",
        //   //   readyInMinutes: 20,
        //   //   popularity: 379,
        //   //   vegan: false,
        //   //   vegetarian: false,
        //   //   glutenFree: false,
        //   // },
        //   {
        //     id: 641308,
        //     title: "Decadent Black Forest Cake",
        //     image: "https://spoonacular.com/recipeImages/641308-556x370.jpg",
        //     readyInMinutes: 45,
        //     popularity: 44,
        //     vegan: false,
        //     vegetarian: false,
        //     glutenFree: false,
        //   },
        //   {
        //     id: 716297,
        //     title: "Breaded Shrimp and Spicy Mayo Appetizer",
        //     image: "https://spoonacular.com/recipeImages/716297-556x370.jpg",
        //     readyInMinutes: 20,
        //     popularity: 379,
        //     vegan: false,
        //     vegetarian: false,
        //     glutenFree: false,
        //   },
        // ];
        if (this.$root.store.username != undefined) {
          let lastSeen = await this.axios.get(
            this.$root.store.server_domain + "/users/allwatched"
          );
          sessionStorage.setItem(
            "watchedRecipes",
            JSON.stringify(lastSeen.data.watched)
          );
          let favorites = JSON.parse(sessionStorage.getItem("favorites"));
          let newRecipes = [];
          this.recipes.forEach((recipe) => {
            let newRecipe = JSON.parse(JSON.stringify(recipe));
            newRecipe.isFavorite = favorites.includes(newRecipe.id.toString());
            newRecipe.isLastseen = lastSeen.data.watched.includes(
              newRecipe.id.toString()
            );
            newRecipes.push(newRecipe);
          });
          this.recipes = newRecipes;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
  position: flex;
}
.recipes-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}
.title {
  margin-left: 100px;
}

.more_btn {
  margin-left: 170px;
  margin-top: 50px;
}
</style>
