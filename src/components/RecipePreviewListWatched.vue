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
          :isLastseen="true"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewListWatched",
  components: {
    RecipePreview,
  },
  props: {
    title: {
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
        const response = await this.axios.get(
          this.$root.store.server_domain + "/users/watch"
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        );
        const recipes = response.data;
        this.recipes = recipes;

        let lastSeen = sessionStorage.getItem("watchedRecipes");
        let favorites = sessionStorage.getItem("favorites");
        let newRecipes = [];
        this.recipes.forEach((recipe) => {
          let newRecipe = JSON.parse(JSON.stringify(recipe));
          newRecipe.isFavorite = favorites.includes(newRecipe.id);
          newRecipe.isLastseen = lastSeen.includes(newRecipe.id);
          newRecipes.push(newRecipe);
        });
        this.recipes = newRecipes;
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
.title{
  margin-left: 100px;
}
.recipes-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}
</style>
