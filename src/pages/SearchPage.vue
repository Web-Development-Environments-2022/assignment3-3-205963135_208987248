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

    <b-container fluid class="p-4 all_recipes">
      <b-row class="row" v-for="(r, index1) in recipes.flat()" :key="index1">
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
          :index="index1 + 1"
        />
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
      let searchedRecipes2 = await this.chunkArray(this.recipesToSort, 3);
      this.recipes = searchedRecipes2;
      this.rerender();
    },
    async searchRecipe() {
      try {
        this.$root.store.server_domain = "https://dm-recipes.cs.bgu.ac.il";
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
        );
        this.valueCuisine = [];
        this.valueDiet = [];
        this.valueIntolerance = [];
        let searchedRecipes = response.data;
        searchedRecipes.popularity = searchedRecipes.aggregateLikes;
        if (this.$root.store.username != undefined) {
          let lastSeen = JSON.parse(sessionStorage.getItem("watchedRecipes"));
          let favorites = JSON.parse(sessionStorage.getItem("favorites"));
          let newRecipes = [];
          searchedRecipes.forEach((recipe) => {
            let newRecipe = JSON.parse(JSON.stringify(recipe));
            newRecipe.isFavorite = favorites.includes(newRecipe.id.toString());
            newRecipe.isLastseen = lastSeen.includes(newRecipe.id.toString());
            newRecipes.push(newRecipe);
          });
          searchedRecipes = newRecipes;
          this.recipesToSort = searchedRecipes;
          let searchedRecipes2 = await this.chunkArray(searchedRecipes, 3);
          this.recipes = searchedRecipes;
            sessionStorage.setItem(
              "searchResults",
              JSON.stringify(searchedRecipes2)
          );
          sessionStorage.setItem("searchText", this.searchText);
        }
        else{
          this.recipes = response.data;
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}
.col {
  margin-bottom: 30px;
  position: relative;
}
.multiple-choice-container {
  width: 25%;
}
.row {
  display: inline-flex !important;
}
.btn-sm {
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>