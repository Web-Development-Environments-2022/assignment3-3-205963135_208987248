<template>
  <div class="container">
    <h1 class="title">My Family Recipes Page</h1>
    <RecipePreviewListV2
      title="My Family Recipes"
      listType="MyFamilyRecipes"
      class="RandomRecipes center"
    />
    <p class="matan">All the recipes writen by Grandpa Matan Zachor. He makes those recipes every weekend and write them by himself!</p>
  </div>
</template>

<script>
import RecipePreviewListV2 from "../components/RecipePreviewListV2.vue";
export default {
  name: "FamilyRecipes",
  components: {
    RecipePreviewListV2,
  },
  mounted() {
    
  }
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
.matan{
  font-weight: bold;
}
</style>
