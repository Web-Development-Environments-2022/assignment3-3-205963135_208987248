<template>
  <div id="app">
    <div id="nav">
      <b-navbar toggleable="lg" type="light" variant="warning">
        <b-navbar-brand>
          <b-button pill variant="outline-secondary"
            ><router-link :to="{ name: 'main' }"
              >Vue Recipes</router-link
            ></b-button
          >
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item>
              <b-button pill variant="outline-secondary"
                ><router-link :to="{ name: 'search' }"
                  >Search</router-link
                ></b-button
              >
            </b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <!-- {{ !$root.store.username }} -->
            <span v-if="!$root.store.username">
              <!-- Guest: -->
              <b-button pill variant="outline-secondary"
                ><router-link :to="{ name: 'register' }"
                  >Register</router-link
                ></b-button
              >

              <b-button pill variant="outline-secondary"
                ><router-link :to="{ name: 'login' }"
                  >Login</router-link
                ></b-button
              >
            </span>
            <span v-else>
              {{ $root.store.username }}:
              <b-dropdown
                text="Personal"
                variant="outline-secondary"
                class="dropdown-recipes"
              >
                <b-dropdown-item href="#"
                  ><router-link :to="{ name: 'myrecipes' }"
                    >My Recipes</router-link
                  ></b-dropdown-item
                >
                <b-dropdown-item href="#"
                  ><router-link :to="{ name: 'myfavoriterecipes' }"
                    >My Favorite Recipes</router-link
                  ></b-dropdown-item
                >
                <b-dropdown-item href="#"
                  ><router-link :to="{ name: 'myfamilyrecipes' }"
                    >My Family Recipes</router-link
                  ></b-dropdown-item
                >
              </b-dropdown>
              <b-button
                pill
                variant="outline-secondary"
                v-b-modal.create-recipe-modal
                >Create New Recipe</b-button
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
                  >
                    <b-form-input
                      id="recipeTitle"
                      v-model="form.title"
                      placeholder="Enter Recipe Name"
                      required
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group id="image" label="Image URL:" label-for="url">
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
                  <!-- <b-button type="submit" variant="primary">Submit</b-button>
                  <b-button type="reset" variant="danger">Reset</b-button> -->
                </b-form>

                <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                  <strong>Ingredients:</strong>
                  <br /><br />
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
                  <br />
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
                  <!-- <b-avatar
                    button
                    @click="addIngredient"
                    variant="info"
                    src="https://cdn4.iconfinder.com/data/icons/cooking-technique/32/Artboard_4-512.png"
                    size="5em"
                    style="text-align: center"
                  ></b-avatar>
                  <b-avatar
                    button
                    @click="removeIngredient"
                    variant="info"
                    src="https://cdn4.iconfinder.com/data/icons/cooking-technique/32/Artboard_4-512.png"
                    size="5em"
                    style="text-align: center"
                  ></b-avatar> -->
                </b-form>

                <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                  <strong>Instructions:</strong>
                  <br /><br />
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
                  <br />
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
                  <!-- <b-avatar
                    button
                    @click="addInstruction"
                    variant="info"
                    src="https://cdn4.iconfinder.com/data/icons/cooking-technique/32/Artboard_4-512.png"
                    size="5em"
                    style="text-align: center"
                  ></b-avatar>
                  <b-avatar
                    button
                    @click="removeInstruction"
                    variant="info"
                    src="https://cdn4.iconfinder.com/data/icons/cooking-technique/32/Artboard_4-512.png"
                    size="5em"
                    style="text-align: center"
                  ></b-avatar> -->

                  <b-button
                    type="submit"
                    variant="primary"
                    style="width: 100px; display: block"
                    class="mx-auto w-100"
                    >Submit</b-button
                  >
                </b-form>
              </b-modal>
              <!-- <b-button pill variant="outline-secondary" @click="openModal">Create New Recipe</b-button> -->
              <b-button pill variant="outline-secondary" @click="Logout"
                >Logout</b-button
              >
            </span>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <router-view />
    </div>
  </div>

  <!-- <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'main' }">Vue Recipes</router-link>|
      <router-link :to="{ name: 'search' }">Search</router-link>|
      {{ !$root.store.username }}
      <span v-if="!$root.store.username">
        Guest:
        <router-link :to="{ name: 'register' }">Register</router-link>|
        <router-link :to="{ name: 'login' }">Login</router-link>|
      </span>
      <span v-else>
        {{ $root.store.username }}: <button @click="Logout">Logout</button>|
      </span>
    </div>
    <router-view />
  </div> -->
</template>

<script>
export default {
  name: "App",
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
    };
  },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    async openModal() {
      this.$root.store.isModalVisible = true;
    },
    async closeModal() {
      this.$root.store.isModalVisible = false;
    },
    onSubmit() {
      let formData = new FormData();
      formData.append("title", this.form.title);
      formData.append("image", this.form.image);
      formData.append("vegan", this.form.vegan);
      formData.append("vegetarian", this.form.vegetarian);
      formData.append("glutenFree", this.form.glutenFree);
      formData.append("readyInMinutes", this.form.readyInMinutes);
      formData.append("servings", this.form.servings);
      for (let i = 0; i < this.form.ingredients.length; i++) {
        formData.append("ingredients[]", this.form.ingredients[i].value);
      }
      for (let i = 0; i < this.form.instructions.length; i++) {
        formData.append("instructions[]", this.form.instructions[i].value);
      }
      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ", " + pair[1]);
      // }
      // formData.append("instructions", this.form.instructions);
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

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.checkbox {
  padding: 10px 10px 10px 25px;
}
// .dropdown-recipes {
//   font-weight: bold;
//   color: #2c3e50;
//   border-radius: 25px;
// }
</style>
