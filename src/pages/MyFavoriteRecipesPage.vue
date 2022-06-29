<template>
  <div class="container">
    <h1 class="title">My Favorite Recipes</h1>
    <RecipePreviewListV2
      listType="MyFavoriteRecipes"
      class="RandomRecipes center"
    />
  </div>
</template>

<script>
import RecipePreviewListV2 from "../components/RecipePreviewListV2.vue";
export default {
  name: "FavoriteRecipe",
  components: {
    RecipePreviewListV2,
  },
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  margin-bottom: 10px;
  margin-top: 25px;
}
.RandomRecipes {
  margin: 30px 0 30px;
  text-align: center;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
