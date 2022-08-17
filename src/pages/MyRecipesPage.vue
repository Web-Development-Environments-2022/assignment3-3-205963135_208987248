<template>
  <div class="container">
    <h1 class="title">My Recipes Page</h1>
    <RecipePreviewListV2
      title="My Recipes"
      listType="MyRecipes"
      class="RandomRecipes center"
    />
  </div>
</template>

<script>
import RecipePreviewListV2 from "../components/RecipePreviewListV2.vue";
export default {
  name: "MyRecipes",
  components: {
    RecipePreviewListV2,
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
  -webkit-filter: blur(5px);
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
