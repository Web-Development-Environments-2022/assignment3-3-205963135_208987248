<template>
  <div id="nav">
    <b-navbar type="dark" variant="dark">
      <div class="left_container">
        <b-nav-item>
          <b-button class="all_btn" pill variant="outline-secondary"
            ><router-link :to="{ name: 'main' }">Recipes</router-link></b-button
          >
        </b-nav-item>
        <b-nav-item>
          <b-button pill variant="outline-secondary"
            ><router-link :to="{ name: 'search' }"
              >Search</router-link
            ></b-button
          >
        </b-nav-item>
        <b-nav-item>
          <b-button
            pill
            variant="outline-secondary"
            @click="$bvModal.show('bv-modal-example')"
            ><a>About</a></b-button
          >
          <b-modal class="modal_class" id="bv-modal-example" hide-footer>
            <template #modal-title>
              Welcome to Maor and Dana recipes!
            </template>
            <div class="d-block text-center">
              <h3>Recipes world</h3>
              <span
                >You can find any recipe you can imagine on our website. You can
                upload your own recipes as well as family recipes.</span
              >
              <div>The team behind the website:</div>
              <img
                class="maor"
                src="@/assets/maor.jpg"
                width="150"
                height="200"
                id="icon"
              />
              <img
                class="dana"
                src="@/assets/dana.jpg"
                width="150"
                height="200"
                id="icon"
              />
              <div>If you like our work, you can see more of our projects</div>
              <div>
                <a
                  href="https://github.com/Web-Development-Environments-2022/208987248_205963135"
                  >Pacman Game</a
                >
              </div>
              <div>
                <a
                  href="https://github.com/Web-Development-Environments-2022/208987248"
                  >Sara's Website</a
                >
              </div>
              <div>
                <a
                  href="https://github.com/Web-Development-Environments-2022/205963135"
                  >Encanto's Website</a
                >
              </div>
            </div>
            <b-button
              class="mt-3"
              block
              @click="$bvModal.hide('bv-modal-example')"
              >Close Me</b-button
            >
          </b-modal>
        </b-nav-item>
      </div>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!-- {{ !$root.store.username }} -->
        <span v-if="!$root.store.username">
          <h7 class="hello">Hello Guest</h7>
          <b-button class="reg_btn" pill variant="outline-secondary"
            ><router-link :to="{ name: 'register' }"
              >Register</router-link
            ></b-button
          >

          <b-button pill variant="outline-secondary"
            ><router-link :to="{ name: 'login' }">Login</router-link></b-button
          >
        </span>
        <span v-else>
          <h7 class="hello">{{ $root.store.username }}:</h7>
          <b-dropdown
            text="Personal"
            variant="dark bold"
            class="dropdown-recipes"
          >
            <b-dropdown-item href="#"
              ><router-link :to="{ name: 'myfavoriterecipes' }"
                ><p>My Favorite Recipes</p></router-link
              ></b-dropdown-item
            >
            <b-dropdown-item href="#"
              ><router-link :to="{ name: 'myfamilyrecipes' }"
                ><p>My Family Recipes</p></router-link
              ></b-dropdown-item
            >
            <b-dropdown-item href="#"
              ><router-link :to="{ name: 'myrecipes' }"
                ><p>My Recipes</p></router-link
              ></b-dropdown-item
            >
          </b-dropdown>

          <a href="#" class="meal">
            <router-link :to="{ name: 'meal' }"
              ><img src="../assets/meal.png" alt=""
            /></router-link>
            <span class="badge" :key="numOfRecipesInMeal">{{
              numOfRecipesInMeal
            }}</span>
          </a>

          <b-button
            class="create_btn"
            pill
            variant="outline-secondary"
            v-b-modal.create-recipe-modal
            ><a>Create New Recipe</a></b-button
          >
          <b-modal
            modal-class="modal-design"
            id="create-recipe-modal"
            ref="modal"
            title="Create Recipe"
            size="xl"
          >
            <b-form @submit="onSubmit" @reset="onReset" inline v-if="show">
              <b-form-checkbox
                id="vegetarian"
                v-model="form.vegetarian"
                name="vegetarian"
                :value="true"
                :unchecked-value="false"
                class="checkbox"
              >
                Vegetarian
              </b-form-checkbox>
              <b-form-checkbox
                id="vegan"
                v-model="form.vegan"
                name="vegan"
                :value="true"
                :unchecked-value="false"
                class="checkbox"
              >
                vegan
              </b-form-checkbox>
              <b-form-checkbox
                id="glutenFree"
                v-model="form.glutenFree"
                name="glutenFree"
                :value="true"
                :unchecked-value="false"
                class="checkbox"
              >
                glutenFree
              </b-form-checkbox>
            </b-form>

            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
              <b-form-group
                id="title"
                label="Recipe Name:"
                label-for="recipeTitle"
                class="recipe_name"
              >
                <b-form-input
                  id="recipeTitle"
                  v-model="form.title"
                  placeholder="Enter Recipe Name"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="image"
                label="Image URL:"
                label-for="url"
                class="bold_text"
              >
                <b-form-input
                  id="url"
                  v-model="form.image"
                  type="string"
                  placeholder="Enter URL to image"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="readyInMinutes"
                label="Preparation Time:"
                class="bold_text"
                label-for="recipeReadyInMinutes"
              >
                <b-form-input
                  id="recipeReadyInMinutes"
                  v-model="form.readyInMinutes"
                  type="integer"
                  placeholder="Enter Preparation Time in Minutes"
                  :state="Boolean(parseInt(form.readyInMinutes))"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="servings"
                label="Number of Servings:"
                label-for="recipeServings"
                class="bold_text"
              >
                <b-form-input
                  id="recipeServings"
                  v-model="form.servings"
                  type="integer"
                  placeholder="Enter The Number of Servings"
                  :state="Boolean(parseInt(form.servings))"
                  required
                ></b-form-input>
              </b-form-group>
            </b-form>

            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
              <strong>Ingredients:</strong>
              <b-form-group
                :state="Boolean(form.ingredients)"
                v-for="ingredient in form.ingredients"
                :key="ingredient.key"
                invalid-feedback="*"
              >
                <b-form-input
                  :state="Boolean(ingredient.value)"
                  v-model="ingredient.value"
                  required
                  placeholder="Ingredient"
                  type="string"
                  class="mb-2 mr-sm-2 mb-sm-0"
                ></b-form-input>
              </b-form-group>
              <div class="two_btn">
                <b-button
                  pill
                  variant="outline-secondary"
                  @click="addIngredient"
                  >Add Ingredient</b-button
                >
                <b-button
                  pill
                  variant="outline-secondary"
                  @click="removeIngredient"
                  >Remove Ingredient</b-button
                >
              </div>
            </b-form>

            <b-form
              class="Instructions"
              @submit="onSubmit"
              @reset="onReset"
              v-if="show"
            >
              <strong>Instructions:</strong>
              <b-form-group
                :state="Boolean(form.instructions)"
                v-for="instruction in form.instructions"
                :key="instruction.key"
                invalid-feedback="*"
              >
                <b-form-input
                  :state="Boolean(instruction.value)"
                  v-model="instruction.value"
                  required
                  placeholder="Instruction"
                  type="string"
                  class="mb-2 mr-sm-2 mb-sm-0"
                ></b-form-input>
              </b-form-group>
              <div class="two_btn">
                <b-button
                  pill
                  variant="outline-secondary"
                  @click="addInstruction"
                  >Add Instruction</b-button
                >
                <b-button
                  pill
                  variant="outline-secondary"
                  @click="removeInstruction"
                  >Remove Instruction</b-button
                >
              </div>

              <b-button
                type="submit"
                pill
                variant="dark"
                style="width: 100px; display: block"
                class="mx-auto w-100 submit"
                >Submit</b-button
              >
            </b-form>
          </b-modal>
          <!-- <b-button pill variant="outline-secondary" @click="openModal">Create New Recipe</b-button> -->
          <b-button pill variant="outline-secondary" @click="Logout"
            ><a>Logout</a></b-button
          >
        </span>
      </b-navbar-nav>
      <!-- </b-collapse> -->
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "NavigationBar",
  data() {
    return {
      form: {
        title: undefined,
        image: undefined,
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        readyInMinutes: undefined,
        servings: undefined,
        ingredients: [{ value: undefined, key: 0 }],
        instructions: [{ value: undefined, key: 0 }],
      },
      ingredientCounter: 1,
      instructionsCounter: 1,
      show: true,
      numOfRecipesInMeal: undefined,
    };
  },
  // created() {
  //   if (this.$root.store.username != undefined) {
  //     this.numOfRecipesInMeal = JSON.parse(
  //       sessionStorage.getItem("recipesInMeal")
  //     );
  //   }
  // },
  mounted() {
    if (this.$root.store.username != undefined) {
      this.numOfRecipesInMeal = JSON.parse(
        sessionStorage.getItem("recipesInMeal")
      );
    }
  },
  updated() {
    if (this.$root.store.username != undefined) {
      this.numOfRecipesInMeal = JSON.parse(
        sessionStorage.getItem("recipesInMeal")
      );
    }
  },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    onSubmit() {
      let instructions = [];
      let ingredients = [];
      let instructionsString = "";
      for (let i = 0; i < this.form.instructions.length; i++) {
        instructions.push({ step: this.form.instructions[i].value });
        instructionsString += this.form.instructions[i].value + ". ";
      }
      for (let i = 0; i < this.form.ingredients.length; i++) {
        ingredients.push({ original: this.form.ingredients[i].value });
      }
      let formData = {
        glutenFree: this.form.glutenFree,
        instructions: instructionsString,
        image: this.form.image,
        popularity: 0,
        readyInMinutes: parseInt(this.form.readyInMinutes),
        title: this.form.title,
        vegan: this.form.vegan,
        vegetarian: this.form.vegetarian,
        servings: parseInt(this.form.servings),
        ingredients: ingredients,
        analyzedInstructions: instructions,
      };
      this.axios
        .post(this.$root.store.server_domain + "/users/my", formData, {
          withCredentials: true,
        })
        .then(
          function (result) {
            console.log(result);
          },
          function (error) {
            console.log(error);
          }
        );
      // event.preventDefault();
      // alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.title = undefined;
      this.form.image = undefined;
      this.form.vegan = false;
      this.form.vegetarian = false;
      this.form.glutenFree = false;
      this.form.readyInMinutes = undefined;
      this.form.servings = undefined;
      this.form.ingredients = [{ value: undefined, key: 0 }];
      this.form.instructions = [{ value: undefined, key: 0 }];
      this.form.ingredientCounter = 1;
      this.form.instructionsCounter = 1;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    addIngredient() {
      this.form.ingredients.push({
        value: undefined,
        key: this.ingredientCounter,
      });
      this.ingredientCounter += 1;
    },
    removeIngredient() {
      if (this.form.ingredients.length == 0) {
        return;
      }
      this.form.ingredients.pop();
      if (this.ingredientCounter > 0) {
        this.ingredientCounter -= 1;
      }
    },
    addInstruction() {
      this.form.instructions.push({
        value: undefined,
        key: this.instructionsCounter,
      });
      this.instructionsCounter += 1;
    },
    removeInstruction() {
      if (this.form.instructions.length == 0) {
        return;
      }
      this.form.instructions.pop();
      if (this.instructionsCounter > 0) {
        this.instructionsCounter -= 1;
      }
    },
  },
};
</script>

<style scoped>
/* @import "@/scss/form-style.scss"; */
#nav p {
  color: black;
}
nav {
  background-color: black !important;
}
.left_container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 15px;
  list-style-type: none;
}
#nav a {
  font-weight: bold;
  color: aliceblue;
  margin-bottom: auto;
}
a:link {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: aliceblue;
}
.hello {
  margin-right: 20px;
  margin-top: 10px !important;
  color: aliceblue;
}
::v-deep .reg_btn {
  margin-right: 20px;
}
::v-deep .dropdown-recipes {
  margin-right: 20px;
}
::v-deep .create_btn {
  margin-right: 20px;
}
.maor {
  margin-right: 40px;
  margin-top: 20px;
}
.dana {
  margin-top: 20px;
}
::v-deep .modal_class {
  background: rgb(177, 51, 51);
  background-color: rgb(177, 51, 51);
}

::v-deep .all_btn {
  color: aliceblue;
  margin: 0;
}
::v-deep .my_modal {
  text-align: center !important;
}
.checkbox {
  display: inline-block;
  margin-right: 280px;
}
.recipe_name {
  margin-top: 30px;
  font-weight: bold;
}
.bold_text {
  font-weight: bold;
}
.Instructions {
  margin-top: 20px;
}
.two_btn {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 15px;
  list-style-type: none;
}
.submit {
  margin-top: 20px;
}
/* ::v-deep .b-navbar .b-navbar-nav .b-dropdown .text {
  color: azure!important;
  font-weight: bold;

} */
.meal {
  color: white;
  text-decoration: none;
  position: relative;
  display: inline-block;
  border-radius: 2px;
  margin-right: 20px;
  transition: 0.2s ease;
}

.meal img {
  width: 40px;
}

/* .meal:hover {
  opacity: 0.7;
} */

.meal .badge {
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 5px 10px;
  border-radius: 50%;
  background: red;
  color: white;
}
</style>