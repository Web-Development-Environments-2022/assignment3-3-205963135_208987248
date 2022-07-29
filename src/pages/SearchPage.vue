<template>
  <div class="search-page">
    <div class="search-holder">
      <div class="search-holder__banner">
        <div class="col-xs-12 text-center hero-header-container">
          <h2 class="hero-header">Find the Best Recipes Right Here</h2>

          <div class="filters">
            <div class="multiple-choice-container">
              <b-form-select
                class="selector"
                v-model="form.number"
                :options="numbers"
              ></b-form-select>
            </div>

            <div class="multiple-choice-container">
              <b-form-group label-for="tags-with-dropdown">
                <b-form-tags
                  id="tags-with-dropdown"
                  v-model="valueCuisine"
                  no-outer-focus
                  class="mb-2"
                >
                  <template v-slot="{ tags, disabled, addTag, removeTag }">
                    <ul
                      v-if="tags.length > 0"
                      class="list-inline d-inline-block mb-2"
                    >
                      <li
                        v-for="tag in tags"
                        :key="tag"
                        class="list-inline-item"
                      >
                        <b-form-tag
                          @remove="removeTag(tag)"
                          :title="tag"
                          :disabled="disabled"
                          variant="info"
                          >{{ tag }}</b-form-tag
                        >
                      </li>
                    </ul>

                    <b-dropdown
                      size="sm"
                      variant="outline-secondary"
                      block
                      menu-class="w-100"
                    >
                      <template #button-content>
                        <b-icon icon="tag-fill"></b-icon> Please choose cuisine
                        to filter by
                      </template>
                      <b-dropdown-form @submit.stop.prevent="() => {}">
                        <b-form-group
                          label="Search tags"
                          label-for="tag-search-input"
                          label-cols-md="auto"
                          class="mb-0"
                          label-size="sm"
                          :description="searchDescCuisines"
                          :disabled="disabled"
                        >
                          <b-form-input
                            v-model="search"
                            id="tag-search-input"
                            type="search"
                            size="sm"
                            autocomplete="off"
                          ></b-form-input>
                        </b-form-group>
                      </b-dropdown-form>
                      <b-dropdown-divider></b-dropdown-divider>
                      <b-dropdown-item-button
                        v-for="cuisine in availableCuisines"
                        :key="cuisine"
                        @click="onCuisineClick({ cuisine, addTag })"
                      >
                        {{ cuisine }}
                      </b-dropdown-item-button>
                      <b-dropdown-text v-if="availableCuisines.length === 0">
                        There are no tags available to select
                      </b-dropdown-text>
                    </b-dropdown>
                  </template>
                </b-form-tags>
              </b-form-group>
            </div>

            <!-- ================================================================ -->
            <div class="multiple-choice-container">
              <b-form-group label-for="tags-with-dropdown">
                <b-form-tags
                  id="tags-with-dropdown"
                  v-model="valueDiet"
                  no-outer-focus
                  class="mb-2"
                >
                  <template v-slot="{ tags, disabled, addTag, removeTag }">
                    <ul
                      v-if="tags.length > 0"
                      class="list-inline d-inline-block mb-2"
                    >
                      <li
                        v-for="tag in tags"
                        :key="tag"
                        class="list-inline-item"
                      >
                        <b-form-tag
                          @remove="removeTag(tag)"
                          :title="tag"
                          :disabled="disabled"
                          variant="info"
                          >{{ tag }}</b-form-tag
                        >
                      </li>
                    </ul>

                    <b-dropdown
                      size="sm"
                      variant="outline-secondary"
                      block
                      menu-class="w-100"
                    >
                      <template #button-content>
                        <b-icon icon="tag-fill"></b-icon> Please choose diet to
                        filter by
                      </template>
                      <b-dropdown-form @submit.stop.prevent="() => {}">
                        <b-form-group
                          label="Search tags"
                          label-for="tag-search-input"
                          label-cols-md="auto"
                          class="mb-0"
                          label-size="sm"
                          :description="searchDescDiets"
                          :disabled="disabled"
                        >
                          <b-form-input
                            v-model="search"
                            id="tag-search-input"
                            type="search"
                            size="sm"
                            autocomplete="off"
                          ></b-form-input>
                        </b-form-group>
                      </b-dropdown-form>
                      <b-dropdown-divider></b-dropdown-divider>
                      <b-dropdown-item-button
                        v-for="diet in availableDiets"
                        :key="diet"
                        @click="onDietClick({ diet, addTag })"
                      >
                        {{ diet }}
                      </b-dropdown-item-button>
                      <b-dropdown-text v-if="availableDiets.length === 0">
                        There are no tags available to select
                      </b-dropdown-text>
                    </b-dropdown>
                  </template>
                </b-form-tags>
              </b-form-group>
            </div>

            <!-- ================================================================ -->
            <div class="multiple-choice-container">
              <b-form-group label-for="tags-with-dropdown">
                <b-form-tags
                  id="tags-with-dropdown"
                  v-model="valueIntolerance"
                  no-outer-focus
                  class="mb-2"
                >
                  <template v-slot="{ tags, disabled, addTag, removeTag }">
                    <ul
                      v-if="tags.length > 0"
                      class="list-inline d-inline-block mb-2"
                    >
                      <li
                        v-for="tag in tags"
                        :key="tag"
                        class="list-inline-item"
                      >
                        <b-form-tag
                          @remove="removeTag(tag)"
                          :title="tag"
                          :disabled="disabled"
                          variant="info"
                          >{{ tag }}</b-form-tag
                        >
                      </li>
                    </ul>

                    <b-dropdown
                      size="sm"
                      variant="outline-secondary"
                      block
                      menu-class="w-100"
                    >
                      <template #button-content>
                        <b-icon icon="tag-fill"></b-icon> Please choose
                        intolerance to filter by
                      </template>
                      <b-dropdown-form @submit.stop.prevent="() => {}">
                        <b-form-group
                          label="Search tags"
                          label-for="tag-search-input"
                          label-cols-md="auto"
                          class="mb-0"
                          label-size="sm"
                          :description="searchDescIntolerances"
                          :disabled="disabled"
                        >
                          <b-form-input
                            v-model="search"
                            id="tag-search-input"
                            type="search"
                            size="sm"
                            autocomplete="off"
                          ></b-form-input>
                        </b-form-group>
                      </b-dropdown-form>
                      <b-dropdown-divider></b-dropdown-divider>
                      <b-dropdown-item-button
                        v-for="intolerance in availableIntolerances"
                        :key="intolerance"
                        @click="onIntoleranceClick({ intolerance, addTag })"
                      >
                        {{ intolerance }}
                      </b-dropdown-item-button>
                      <b-dropdown-text
                        v-if="availableIntolerances.length === 0"
                      >
                        There are no tags available to select
                      </b-dropdown-text>
                    </b-dropdown>
                  </template>
                </b-form-tags>
              </b-form-group>
            </div>

            <!-- ================================================================ -->
            <!-- <b-form-select
              multiple
              :select-size="100"
              class="selector"
              v-model="form.cuisine"
              :options="cuisines"
            ></b-form-select>
            <b-form-select
              multiple
              :select-size="100"
              class="selector"
              v-model="form.diet"
              :options="diets"
            ></b-form-select>
            
            <b-form-select
              multiple
              :select-size="100"
              class="selector"
              v-model="form.intolerance"
              :options="intolerances"
            ></b-form-select> -->
          </div>

          <div class="search-container">
            <div class="search-bar">
              <div class="form-holder">
                <div class="navbarSearch">
                  <input
                    @change="onChange"
                    @keyup="onChange"
                    v-model="searchText"
                    class="
                      form-control
                      navbar-search-input
                      js-navbar-search-input
                      nav-input
                      js-filter-topics
                    "
                    type="text"
                    placeholder="Search for recipes"
                  />
                </div>
                <img
                  class="icon"
                  src="https://hackr.io/assets/images/header-icons/search-header.svg"
                  width="17"
                  height="17"
                />
              </div>
            </div>
            <b-button
              class="search_btn"
              v-on:click="searchRecipe"
              variant="outline-dark"
              >Search Recipes</b-button
            >
            <h2 class="hero-header">Most Recent Search:</h2>
          </div>
        </div>
      </div>
    </div>
    <b-container v-if="search_cond" :key="rerenderer">
      <div class="sorting-buttons">
        <b-button
          v-on:click="
            () => {
              this.sortRecipes('Time Asc');
            }
          "
          variant="outline-dark"
          >Sort by Preparation Time Lowest First</b-button
        >
        <b-button
          v-on:click="
            () => {
              this.sortRecipes('Time Desc');
            }
          "
          variant="outline-dark"
          >Sort by Preparation Time Highest First</b-button
        >
        <b-button
          v-on:click="
            () => {
              this.sortRecipes('Popularity Asc');
            }
          "
          variant="outline-dark"
          >Sort by Popularity Lowest First</b-button
        >
        <b-button
          v-on:click="
            () => {
              this.sortRecipes('Popularity Desc');
            }
          "
          variant="outline-dark"
          >Sort by Popularity Highest First</b-button
        >
      </div>
      <h4 class="hero-header" v-if="recipes.length == 0">
        No results was found please try again
      </h4>
    </b-container>

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
            :aggregateLikes="r.aggregateLikes"
            :isFavorite="r.isFavorite"
            :isLastseen="r.isLastseen"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import RecipePreview from "../components/RecipePreview.vue";
export default {
  name: "SearchPage",
  components: {
    RecipePreview,
  },
  data() {
    return {
      searchText: sessionStorage.getItem("searchText"),
      search_cond: Boolean(sessionStorage.getItem("searchText")),
      rerenderer: 0,
      RecipesList: "",
      valueCuisine: [],
      valueDiet: [],
      valueIntolerance: [],
      form: {
        number: 5,
        cuisine: "",
        diet: "",
        intolerance: "",
        SubmitError: undefined,
      },
      // cuisines: [
      //   { value: "", text: "Choose a Cuisine Filter" },
      //   { value: "African", text: "African" },
      //   { value: "American", text: "American" },
      //   { value: "British", text: "British" },
      //   { value: "Cajun", text: "Cajun" },
      //   { value: "Caribbean", text: "Caribbean" },
      //   { value: "Chinese", text: "Chinese" },
      //   { value: "Eastern European", text: "Eastern European" },
      //   { value: "European", text: "European" },
      //   { value: "French", text: "French" },
      //   { value: "German", text: "German" },
      //   { value: "Greek", text: "Greek" },
      //   { value: "Indian", text: "Indian" },
      //   { value: "Irish", text: "Irish" },
      //   { value: "Italian", text: "Italian" },
      //   { value: "Japanese", text: "Japanese" },
      //   { value: "Jewish", text: "Jewish" },
      //   { value: "Korean", text: "Korean" },
      //   { value: "Latin American", text: "Latin American" },
      //   { value: "Mediterranean", text: "Mediterranean" },
      //   { value: "Mexican", text: "Mexican" },
      //   { value: "Middle Eastern", text: "Middle Eastern" },
      //   { value: "Nordic", text: "Nordic" },
      //   { value: "Southern", text: "Southern" },
      //   { value: "Spanish", text: "Spanish" },
      //   { value: "Thai", text: "Thai" },
      //   { value: "Vietnamese", text: "Vietnamese" },
      // ],
      cuisines: [
        "African",
        "American",
        "British",
        "Cajun",
        "Caribbean",
        "Chinese",
        "Eastern European",
        "European",
        "French",
        "German",
        "Greek",
        "Indian",
        "Irish",
        "Italian",
        "Japanese",
        "Jewish",
        "Korean",
        "Latin American",
        "Mediterranean",
        "Mexican",
        "Middle Eastern",
        "Nordic",
        "Southern",
        "Spanish",
        "Thai",
        "Vietnamese",
      ],
      numbers: [
        { value: 5, text: "Choose Number of Recipes Results" },
        { value: 5, text: "5" },
        { value: 10, text: "10" },
        { value: 15, text: "15" },
      ],
      // diets: [
      //   { value: "", text: "Choose Your Diet" },
      //   { value: "Gluten Free", text: "Gluten Free" },
      //   { value: "Ketogenic", text: "Ketogenic" },
      //   { value: "Vegetarian", text: "Vegetarian" },
      //   { value: "Lacto-Vegetarian", text: "Lacto-Vegetarian" },
      //   { value: "Ovo-Vegetarian", text: "Ovo-Vegetarian" },
      //   { value: "Vegan", text: "Vegan" },
      //   { value: "Pescetarian", text: "Pescetarian" },
      //   { value: "Paleo", text: "Paleo" },
      //   { value: "Primal", text: "Primal" },
      //   { value: "Low FODMAP", text: "Low FODMAP" },
      //   { value: "Whole30", text: "Whole30" },
      // ],
      diets: [
        "Choose Your Diet",
        "Gluten Free",
        "Ketogenic",
        "Vegetarian",
        "Lacto-Vegetarian",
        "Ovo-Vegetarian",
        "Vegan",
        "Pescetarian",
        "Paleo",
        "Primal",
        "Low FODMAP",
        "Whole30",
      ],
      // intolerances: [
      //   { value: "", text: "Choose Your Intolerances" },
      //   { value: "Dairy", text: "Dairy" },
      //   { value: "Egg", text: "Egg" },
      //   { value: "Gluten", text: "Gluten" },
      //   { value: "Grain", text: "Grain" },
      //   { value: "Peanut", text: "Peanut" },
      //   { value: "Seafood", text: "Seafood" },
      //   { value: "Sesame", text: "Sesame" },
      //   { value: "Shellfish", text: "Shellfish" },
      //   { value: "Soy", text: "Soy" },
      //   { value: "Sulfite", text: "Sulfite" },
      //   { value: "Tree Nut", text: "Tree Nut" },
      //   { value: "Wheat", text: "Wheat" },
      // ],
      intolerances: [
        "Choose Your Intolerances",
        "Dairy",
        "Egg",
        "Gluten",
        "Grain",
        "Peanut",
        "Seafood",
        "Sesame",
        "Shellfish",
        "Soy",
        "Sulfite",
        "Tree Nut",
        "Wheat",
      ],
      recipes: sessionStorage.getItem("searchResults")
        ? JSON.parse(sessionStorage.getItem("searchResults"))
        : [],
      recipesToSort: [],
      search: "",
    };
  },
  computed: {
    criteria() {
      // Compute the search criteria
      return this.search.trim().toLowerCase();
    },
    availableCuisines() {
      const criteria = this.criteria;
      // Filter out already selected options
      const options = this.cuisines.filter(
        (opt) => this.valueCuisine.indexOf(opt) === -1
      );
      if (criteria) {
        // Show only options that match criteria
        return options.filter(
          (opt) => opt.toLowerCase().indexOf(criteria) > -1
        );
      }
      // Show all options available
      return options;
    },
    availableDiets() {
      const criteria = this.criteria;
      // Filter out already selected options
      const options = this.diets.filter(
        (opt) => this.valueDiet.indexOf(opt) === -1
      );
      if (criteria) {
        // Show only options that match criteria
        return options.filter(
          (opt) => opt.toLowerCase().indexOf(criteria) > -1
        );
      }
      // Show all options available
      return options;
    },
    availableIntolerances() {
      const criteria = this.criteria;
      // Filter out already selected options
      const options = this.intolerances.filter(
        (opt) => this.valueIntolerance.indexOf(opt) === -1
      );
      if (criteria) {
        // Show only options that match criteria
        return options.filter(
          (opt) => opt.toLowerCase().indexOf(criteria) > -1
        );
      }
      // Show all options available
      return options;
    },
    searchDescCuisines() {
      if (this.criteria && this.availableCuisine.length === 0) {
        return "There are no tags matching your search criteria";
      }
      return "";
    },
    searchDescDiets() {
      if (this.criteria && this.availableDiets.length === 0) {
        return "There are no tags matching your search criteria";
      }
      return "";
    },
    searchDescIntolerances() {
      if (this.criteria && this.availableIntolerances.length === 0) {
        return "There are no tags matching your search criteria";
      }
      return "";
    },
  },
  methods: {
    onCuisineClick({ cuisine, addTag }) {
      this.valueCuisine.push(cuisine);
      addTag(cuisine);
      this.form.cuisine = "";
    },
    onDietClick({ diet, addTag }) {
      this.valueDiet.push(diet);
      addTag(diet);
      this.form.diet = "";
    },
    onIntoleranceClick({ intolerance, addTag }) {
      this.valueIntolerance.push(intolerance);
      addTag(intolerance);
      this.form.intolerance = "";
    },
    async rerender() {
      this.rerenderer = 1 - this.rerenderer;
    },
    onChange() {
      this.$emit("search", this.searchText);
    },
    async chunkArray(myArray, chunk_size) {
      var index = 0;
      var arrayLength = myArray.length;
      var tempArray = [];

      for (index = 0; index < arrayLength; index += chunk_size) {
        let myChunk = myArray.slice(index, index + chunk_size);
        // Do something if you want with the group
        tempArray.push(myChunk);
      }
      return tempArray;
    },
    async sortRecipes(sortingBy) {
      if (sortingBy == "Time Asc") {
        this.recipesToSort.sort((recipe1, recipe2) => {
          return recipe1.readyInMinutes - recipe2.readyInMinutes;
        });
      } else if (sortingBy == "Popularity Asc") {
        this.recipesToSort.sort((recipe1, recipe2) => {
          return recipe1.aggregateLikes - recipe2.aggregateLikes;
        });
      } else if (sortingBy == "Time Desc") {
        this.recipesToSort.sort((recipe1, recipe2) => {
          return recipe2.readyInMinutes - recipe1.readyInMinutes;
        });
      } else if (sortingBy == "Popularity Desc") {
        this.recipesToSort.sort((recipe1, recipe2) => {
          return recipe2.aggregateLikes - recipe1.aggregateLikes;
        });
      }
      // console.log(this.recipesToSort);
      let searchedRecipes2 = await this.chunkArray(this.recipesToSort, 3);
      // console.log(searchedRecipes2);
      this.recipes = searchedRecipes2;
      this.rerender();
    },
    async searchRecipe() {
      try {
        this.$root.store.server_domain = "http://127.0.0.1:3000";
        let cuisinesFilters = JSON.parse(JSON.stringify(this.valueCuisine));
        let dietFilers = JSON.parse(JSON.stringify(this.valueDiet));
        let intoleranceFilters = JSON.parse(
          JSON.stringify(this.valueIntolerance)
        );
        const response = await this.axios.post(
          this.$root.store.server_domain + "/recipes/search",
          {
            querySearch: this.searchText,
            numberSearch: this.form.number,
            cuisineSearch:
              cuisinesFilters.join() != undefined ? cuisinesFilters.join() : "",
            dietSearch: dietFilers.join() != undefined ? dietFilers.join() : "",
            intoleranceSearch:
              intoleranceFilters.join() != undefined
                ? intoleranceFilters.join()
                : "",
          }
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        );
        this.valueCuisine = [];
        this.valueDiet = [];
        this.valueIntolerance = [];
        let searchedRecipes = response.data;
        // console.log(searchedRecipes);
        searchedRecipes.popularity = searchedRecipes.aggregateLikes;
        let lastSeen = JSON.parse(sessionStorage.getItem("watchedRecipes"));
        let favorites = JSON.parse(sessionStorage.getItem("favorites"));
        console.log(lastSeen);
        let newRecipes = [];
        searchedRecipes.forEach((recipe) => {
          let newRecipe = JSON.parse(JSON.stringify(recipe));
          newRecipe.isFavorite = favorites.includes(newRecipe.id.toString());
          newRecipe.isLastseen = lastSeen.includes(newRecipe.id.toString());
          newRecipes.push(newRecipe);
          // console.log(newRecipe);
        });
        searchedRecipes = newRecipes;
        // console.log(searchedRecipes);
        this.recipesToSort = searchedRecipes;
        // console.log(this.recipesToSort);
        let searchedRecipes2 = await this.chunkArray(searchedRecipes, 3);
        // console.log(searchedRecipes2);
        this.recipes = searchedRecipes2;
        if (this.$root.store.username != undefined) {
          sessionStorage.setItem(
            "searchResults",
            JSON.stringify(searchedRecipes2)
          );
          sessionStorage.setItem("searchText", this.searchText);
        }
        this.search_cond = true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style lang="scss">
.search-holder {
  margin-top: 60px;
  &__banner {
    margin: 0 auto;
    width: 80%;
    padding-left: 15px;
    padding-right: 15px;
    text-align: center;
  }
  &__fullbanner {
    margin: 0 auto;
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
    text-align: center;
  }
  .hero-header {
    // margin: 0 0 25px;
    // line-height: 1;
    // font-size: 34px;
    text-align: center;
  }
  .search-bar {
    .form-holder {
      position: relative;
    }
    .form-control {
      display: block;
      width: 100%;
      height: 34px;
      padding: 6px 12px;
      font-size: 14px;
      line-height: 1.42857143;
      color: #555;
      background-color: #fff;
      background-image: none;
      border: 1px solid #ccc;
      border-radius: 4px;
      -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
      -webkit-transition: border-color ease-in-out 0.15s,
        -webkit-box-shadow ease-in-out 0.15s;
      -o-transition: border-color ease-in-out 0.15s,
        box-shadow ease-in-out 0.15s;
      transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    }
    .navbar-search-input {
      z-index: 1 !important;
      height: 51px;
      font-size: 18px;
      padding: 6px 18px 7px 45px;
      background-color: #ffffff !important;
      box-shadow: 0 2px 14px rgba(0, 0, 0, 0.11);
      border-color: #eeeeee;
    }
    .icon {
      left: 12px;
      font-size: 18px;
      padding-left: 2px;
      opacity: 0.7;
      color: var(--theme-primary-light);
      position: absolute;
      top: 50%;
      left: 17px;
      transform: translateY(-50%) scale(1.1);
      opacity: 0.5;
      z-index: 2;
      transition: all 0.2s linear;
    }
  }
}

.my-dropdown-toggle {
  border-radius: 5px;

  ::v-deep .dropdown-toggle {
    color: tomato;
    font-size: 25px;
    font-weight: 800;
  }

  ::v-deep .dropdown-toggle-placeholder {
    color: #c4c4c4;
  }
}
.filters {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
}
.search-container {
  // display: flex;
  flex-direction: row;
  justify-content: center;
}
.sorting-buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
  margin-bottom: 20px;
}
.search_btn {
  margin-top: 20px;
  margin-bottom: 50px;
}
.all_recipes {
  display: contents;
  flex-direction: row;
  justify-content: center;
}
.col {
  margin-bottom: 30px;
  position: relative;
}
// .navbarSearch{
//   width: 200%;
//   left: 0px
// }
.multiple-choice-container {
  width: 25%;
}
</style>