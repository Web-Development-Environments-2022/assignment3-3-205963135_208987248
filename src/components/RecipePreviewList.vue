<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview
          class="recipePreview"
          :recipe="r"
          :id="r.id"
          :title="r.title"
          :readyInMinutes="r.readyInMinutes"
          :image="r.image"
        />
      </b-col>
    </b-row>
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
        this.$root.store.server_domain = "http://127.0.0.1:3000";
        // let response;
        // if (this.listType == "RandomRecipes") {
        //   response = await this.axios.get(
        //     this.$root.store.server_domain + "/recipes/random"
        //     // "https://test-for-3-2.herokuapp.com/recipes/random"
        //   );
        // } else if (this.listType == "MyRecipes") {
        //   response = await this.axios.get(
        //     this.$root.store.server_domain + "/users/my"
        //     // "https://test-for-3-2.herokuapp.com/recipes/random"
        //   );
        // } else if (this.listType == "MyFamilyRecipes") {
        //   response = await this.axios.get(
        //     this.$root.store.server_domain + "/users/family"
        //     // "https://test-for-3-2.herokuapp.com/recipes/random"
        //   );
        // } else if (this.listType == "MyFavoriteRecipes") {
        //   response = await this.axios.get(
        //     this.$root.store.server_domain + "/users/favorites"
        //     // "https://test-for-3-2.herokuapp.com/recipes/random"
        //   );
        // }
        // console.log(response);
        // const resultsRecipes = response.data;
        // this.recipes = resultsRecipes;
        // console.log(this.recipes);
        this.recipes = [
          {
            id: 661188,
            title: "Spicy Seasoned Loaded Guacamole",
            image: "https://spoonacular.com/recipeImages/661188-556x370.jpg",
            readyInMinutes: 45,
            popularity: 47,
            vegan: true,
            vegetarian: true,
            glutenFree: true,
          },
          {
            id: 641308,
            title: "Decadent Black Forest Cake",
            image: "https://spoonacular.com/recipeImages/641308-556x370.jpg",
            readyInMinutes: 45,
            popularity: 44,
            vegan: false,
            vegetarian: false,
            glutenFree: false,
          },
          {
            id: 716297,
            title: "Breaded Shrimp and Spicy Mayo Appetizer",
            image: "https://spoonacular.com/recipeImages/716297-556x370.jpg",
            readyInMinutes: 20,
            popularity: 379,
            vegan: false,
            vegetarian: false,
            glutenFree: false,
          },
          {
            id: 641308,
            title: "Decadent Black Forest Cake",
            image: "https://spoonacular.com/recipeImages/641308-556x370.jpg",
            readyInMinutes: 45,
            popularity: 44,
            vegan: false,
            vegetarian: false,
            glutenFree: false,
          },
          {
            id: 716297,
            title: "Breaded Shrimp and Spicy Mayo Appetizer",
            image: "https://spoonacular.com/recipeImages/716297-556x370.jpg",
            readyInMinutes: 20,
            popularity: 379,
            vegan: false,
            vegetarian: false,
            glutenFree: false,
          },
        ];
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
}
</style>
