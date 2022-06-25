<template>
  <div class="search-page">
    <div class="search-holder">
      <div class="search-holder__banner">
        <div class="col-xs-12 text-center hero-header-container">
          <h1 class="hero-header">
            Find the Best Recipes Right Here
          </h1>
          <div class="search-bar">
            <div class="form-holder">
              <div class="navbarSearch">
                <input
                  @change="onChange"
                  @keyup="onChange"
                  v-model="searchText"
                  class="form-control navbar-search-input js-navbar-search-input nav-input js-filter-topics"
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
        </div>
      </div>
      <b-button v-on:click="searchRecipe" variant="outline-info">Search Recipes</b-button>
    </div>
    <div class="filters">
      <b-form-select class="selector" v-model="form.cuisine" :options="cuisines"></b-form-select>
      <b-form-select class="selector" v-model="form.diet" :options="diets"></b-form-select>
      <b-form-select class="selector" v-model="form.number" :options="numbers"></b-form-select>
      <b-form-select class="selector" v-model="form.intolerance" :options="intolerances"></b-form-select>
    </div>
    <!-- <RecipePreviewList title="search-results"></RecipePreviewList> -->
    <div v-if="search_cond">
      <b-row>
        <b-col v-for="r in recipes" :key="r.id">
          <RecipePreview class="recipePreview" :recipe="r" :key="r.id" title="search-results"/>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
// import dropdown from 'vue-dropdowns';
// import RecipePreviewList from "../components/RecipePreviewList.vue";
import RecipePreview from "../components/RecipePreview.vue";
import {
  required,
  alpha
} from "vuelidate/lib/validators";
export default {
    name: "SearchPage",
    components: {
      // RecipePreviewList,
      RecipePreview,
    },
    // props: {
    //   title: {
    //     type: String,
    //     required: true
    //   }
    // },
    data() {
        return {
            searchText: "",
            search_cond: false,
            RecipesList: "",
            form: {
              number: 5,
              cuisine: "",
              diet: "",
              intolerance: "",
              SubmitError: undefined,
            },
            cuisines: [
              {value: "", text:"Choose a Cuisine Filter"},
              {value: "African", text:"African"},
              {value: "American", text:"American"},
              {value: "British", text:"British"},
              {value: "Cajun", text:"Cajun"},
              {value: "Caribbean", text:"Caribbean"},
              {value: "Chinese", text:"Chinese"},
              {value: "Eastern European", text:"Eastern European"},
              {value: "European", text:"European"},
              {value: "French", text:"French"},
              {value: "German", text:"German"},
              {value: "Greek", text:"Greek"},
              {value: "Indian", text:"Indian"},
              {value: "Irish", text:"Irish"},
              {value: "Italian", text:"Italian"},
              {value: "Japanese", text:"Japanese"},
              {value: "Jewish", text:"Jewish"},
              {value: "Korean", text:"Korean"},
              {value: "Latin American", text:"Latin American"},
              {value: "Mediterranean", text:"Mediterranean"},
              {value: "Mexican", text:"Mexican"},
              {value: "Middle Eastern", text:"Middle Eastern"},
              {value: "Nordic", text:"Nordic"},
              {value: "Southern", text:"Southern"},
              {value: "Spanish", text:"Spanish"},
              {value: "Thai", text:"Thai"},
              {value: "Vietnamese", text:"Vietnamese"},
            ],
            numbers: [
              {value: 5, text:"Choose Number of Recipes Results"},
              {value: 5, text:"5"},
              {value: 10, text:"10"},
              {value: 15, text:"15"},
            ],
            diets: [
              {value: "", text:"Choose Your Diet"},
              {value: "Gluten Free", text:"Gluten Free"},
              {value: "Ketogenic", text:"Ketogenic"},
              {value: "Vegetarian", text:"Vegetarian"},
              {value: "Lacto-Vegetarian", text:"Lacto-Vegetarian"},
              {value: "Ovo-Vegetarian", text:"Ovo-Vegetarian"},
              {value: "Vegan", text:"Vegan"},
              {value: "Pescetarian", text:"Pescetarian"},
              {value: "Paleo", text:"Paleo"},
              {value: "Primal", text:"Primal"},
              {value: "Low FODMAP", text:"Low FODMAP"},
              {value: "Whole30", text:"Whole30"},
            ],
            intolerances: [
              {value: "", text:"Choose Your Intolerances"},
              {value: "Dairy", text:"Dairy"},
              {value: "Egg", text:"Egg"},
              {value: "Gluten", text:"Gluten"},
              {value: "Grain", text:"Grain"},
              {value: "Peanut", text:"Peanut"},
              {value: "Seafood", text:"Seafood"},
              {value: "Sesame", text:"Sesame"},
              {value: "Shellfish", text:"Shellfish"},
              {value: "Soy", text:"Soy"},
              {value: "Sulfite", text:"Sulfite"},
              {value: "Tree Nut", text:"Tree Nut"},
              {value: "Wheat", text:"Wheat"},
            ],
            recipes: [],
        };
    },
    methods: {
        onChange() {
            this.$emit("search", this.searchText);
        },
        async searchRecipe(){
          try {
            this.$root.store.server_domain = "http://localhost:3000";
            const response = await this.axios.post(
              this.$root.store.server_domain + "/recipes/search",
              {
                "querySearch": this.searchText,
                "numberSearch": this.form.number,
                "cuisineSearch": this.form.cuisine,
                "dietSearch": this.form.diet,
                "intoleranceSearch": this.form.intolerance,
              }
              // "https://test-for-3-2.herokuapp.com/recipes/random"
            );
            const searchedRecipes = response.data;
            console.log(searchedRecipes);
            this.recipes = [];
            console.log("Here");
            this.recipes.push(...searchedRecipes);
            console.log("Here");
            this.search_cond = true;
            // this.recipes.forEach((recipe, index) => {
            //   let col = document.createElement("b-col");
            //   let RecipePreview = document.createElement("RecipePreview");
            //   col.appendChild(RecipePreview)
            //   document.getElementById('row').appendChild(col)
            // })
          } catch (error) {
            console.log(error);
          }
        }
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
    margin: 0 0 25px;
    line-height: 1;
    font-size: 34px;
    text-align: left;
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
</style>