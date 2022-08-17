<template>
  <b-container class="icon-container">
    <b-row>
      <b-col>
        <b-col v-if="!this.$root.store.username"> </b-col>
        <b-col v-else-if="this.recipe.isFavorite">
          <img
            id="logoFavorite"
            src="../assets/heart-full.png"
            alt="Not favorite"
            style="
              width: 35px;
              height: 35px;
              margin-bottom: -1px;
              margin-top: 1px;
            "
          />
        </b-col>
        <b-col v-else>
          <img
            id="logoNotFavorite"
            src="../assets/heart-empty.png"
            @mouseover="hover = true"
            @mouseleave="hover = false"
            v-on:click="addToFavorite"
            alt="Not favorite"
            style="
              width: 25px;
              height: 25px;
              margin-bottom: -1px;
              margin-top: 1px;
            "
          />
          <br />
          <span v-if="hover">Click to add as Favorite! </span>
        </b-col>
      </b-col>
      <b-col v-if="this.isLastseen && this.$root.store.username">
        <img
          id="watched-image"
          src="../assets/watched.png"
          alt="Watched"
          style="
            width: 35px;
            height: 35px;
            margin-bottom: -1px;
            margin-top: 1px;
          "
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "iconBar",
  props: {
    isFavorite: {
      type: Boolean,
      required: true,
    },
    isLastseen: {
      type: Boolean,
      required: true,
    },
    recipe: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      hover: false,
    };
  },
  methods: {
    async addToFavorite() {
      this.recipe.isFavorite = true;
      try {
        this.$root.store.server_domain = "https://dm-recipes.cs.bgu.ac.il";
        let lastSeen = await this.axios.get(
          this.$root.store.server_domain + "/users/allwatched"
        );
        let favorites = await this.axios.get(
          this.$root.store.server_domain + "/users/favorites"
        );
        let favoritesIds = [];
        favorites.data.forEach((recipe) => {
          favoritesIds.push(recipe.id.toString());
        });
        if (!favoritesIds.includes(this.recipe.id.toString())) {
          favoritesIds.push(this.recipe.id.toString());
          await this.axios.post(
            this.$root.store.server_domain + "/users/favorites",{"recipeId": this.recipe.id.toString()}
          );
        }
        sessionStorage.setItem("favorites", JSON.stringify(favoritesIds));
        let lastSearch = JSON.parse(sessionStorage.getItem("searchResults"));
        let newLastSearch = [];
        lastSearch.forEach((recipeList) => {
          let newRecipeList = [];
          recipeList.forEach((recipe) => {
            if (favoritesIds.includes(recipe.id.toString())) {
              recipe.isFavorite = true;
            }
            if (lastSeen.data.watched.includes(recipe.id.toString())) {
              recipe.isLastseen = true;
            }
            newRecipeList.push(recipe);
          });
          newLastSearch.push(newRecipeList);
        });
        sessionStorage.setItem("searchResults", JSON.stringify(newLastSearch));
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100px;
  padding: 20px;
}
.icon-container {
  padding-left: 20%;
}
</style>
