<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <RecipePreviewList
      title="Random Recipes"
      listType="RandomRecipes"
      class="RandomRecipes center"
    />
    <router-link v-if="!$root.store.username" to="/login" tag="button"
      >You need to Login to vue this</router-link
    >
    <!-- {{ !$root.store.username }} -->
    <RecipePreviewListWatched
      title="Last Viewed Recipes"
      :class="{
        RandomRecipes: true,
        blur: !$root.store.username,
        center: true,
      }"
      disabled
    ></RecipePreviewListWatched>
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";
import RecipePreviewListWatched from "../components/RecipePreviewListWatched.vue";
export default {
  components: {
    RecipePreviewList,
    RecipePreviewListWatched,
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
