<template>
  <div class="container" >
    <h1 class="title">My Recipes Page</h1>
    <RecipePreviewList
      title="My Recipes"
      listType="MyRecipes"
      class="RandomRecipes center"
    />
    <!-- <div>
    <h1 class="title">My Recipes Page</h1>
    <b-container fluid class="p-4 bg-light all_recipes">

      <b-row v-for="(recipeList, index2) in recipes" :key="index2">
        <b-col class="col" v-for="(r, index1) in recipeList" :key="index1">
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
  </div> -->
  </div>
</template>

<script>
// import RecipePreview from "../components/RecipePreview.vue";

import RecipePreviewList from "../components/RecipePreviewList.vue";
export default {
  name: "MyRecipes",
  components: {
    // RecipePreview,
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
