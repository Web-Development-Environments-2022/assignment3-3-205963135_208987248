<template>
  <div class="container">
    <h1 class="title_top">Main Page</h1>
    <div class="row_container">
      <div class="column">
        <RecipePreviewList
          title="Explore this recipes"
          listType="RandomRecipes"
          class="RandomRecipes center"
        />
      </div>
      <div class="column">
        <router-link
          class="login_first_btn"
          v-if="!$root.store.username"
          to="/login"
          tag="button"
          >You need to Login to vue this</router-link
        >
        <RecipePreviewListWatched
          title="Last Viewed Recipes"
          :class="{
            RandomRecipes: true,
            blur: !$root.store.username,
            center: true,
          }"
          disabled
        ></RecipePreviewListWatched>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";
import RecipePreviewListWatched from "../components/RecipePreviewListWatched.vue";
export default {
  name: "Main",
  components: {
    RecipePreviewList,
    RecipePreviewListWatched,
  },
};
</script>

<style lang="scss" scoped>
.title_top {
  text-align: center;
}
.title {
  margin-top: 20px;
}
.RandomRecipes {
  margin: 30px 0 30px;
}
.blur {
  -webkit-filter: blur(5px);
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
.row_container {
  display: flex;
}
.column {
  flex: 50%;
}
.login_first_btn {
  margin-left: 120px;
  margin-top: 50px;
}
</style>
