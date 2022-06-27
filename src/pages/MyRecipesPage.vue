<template>
  <div class="container">
    <h1 class="title">My Recipes Page</h1>
    <RecipePreviewList
      title="My Recipes"
      listType="MyRecipes"
      class="RandomRecipes center"
    />
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";
export default {
  components: {
    RecipePreviewList,
  },
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
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
