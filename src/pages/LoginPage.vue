<template>
  <div class="container">
    <img class="welcome" src="@/assets/welcome.png" width="500" height="250" />
    <!-- <h1 class="title">Login</h1> -->

    <b-form class="my_form" @submit.prevent="onLogin">
      <b-form-group
        id="input-group-Username"
        label-cols-sm="3"
        label="Username:"
        label-for="Username"
      >
        <b-form-input
          id="Username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Username is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="Password"
      >
        <b-form-input
          id="Password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Password is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="dark"
        style="width: 100px; display: block"
        class="mx-auto w-100 login_btn"
        >Login</b-button
      >
      <div class="mt-2 reg_here">
        Do not have an account yet?
        <router-link to="register"> Register in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Login failed: {{ form.submitError }}
    </b-alert>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined,
      },
    };
  },
  validations: {
    form: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        // this.$root.store.server_domain = "http://127.0.0.1:3000";
        this.$root.store.server_domain = "https://dm-recipes.cs.bgu.ac.il:443";
        const response = await this.axios.post(
          // "https://test-for-3-2.herokuapp.com/user/Login",
          this.$root.store.server_domain + "/login",
          // "http://132.72.65.211:80/Login",
          // "http://132.73.84.100:80/Login",

          {
            username: this.form.username,
            password: this.form.password,
          }
        );

        // console.log(response);
        // this.$root.loggedIn = true;

        this.$root.store.login(this.form.username);
        let lastSeen = await this.axios.get(
          this.$root.store.server_domain + "/users/allwatched"
        );
        let favorites = await this.axios.get(
          this.$root.store.server_domain + "/users/favorites"
        );
        // console.log(this.$root.store.login);
        let meal = await this.axios.post(
          this.$root.store.server_domain + "/recipes/meal",
          { userName: this.form.username }
        );
        // console.log(meal);
        sessionStorage.setItem(
          "recipesInMeal",
          JSON.stringify(meal.data.length)
        );
        sessionStorage.setItem(
          "mealRecipesInstructionLength",
          JSON.stringify(meal.data)
        );

        let favoritesIds = [];
        favorites.data.forEach((recipe) => {
          favoritesIds.push(recipe.id.toString());
        });
        // console.log(lastSeen.data.watched);
        sessionStorage.setItem(
          "watchedRecipes",
          JSON.stringify(lastSeen.data.watched)
        );
        sessionStorage.setItem("favorites", JSON.stringify(favoritesIds));
        
        let recipesList = [];
        meal.data.forEach(function (object) {
          recipesList.push(object.recipeId);
        });
        let mealRecipes = await this.axios.post(
          this.$root.store.server_domain + "/recipes/previewDetails",
          { recipeIdList: recipesList }
        );
        let newMealRecipes = [];
        mealRecipes.data.forEach(function (recipe) {
          recipe.isFavorite = false;
          recipe.isLastseen = false;
          if (favoritesIds.includes(recipe.id.toString())) {
            recipe.isFavorite = true;
          }
          if (lastSeen.data.watched.includes(recipe.id.toString())) {
            recipe.isLastseen = true;
          }
          newMealRecipes.push(recipe);
        });
        // console.log(newMealRecipes);
        sessionStorage.setItem("mealRecipes", JSON.stringify(newMealRecipes));
        this.$router.push("/");
      } catch (err) {
        console.log(err);
        this.form.submitError = err.response.data.message;
      }
    },
    onLogin() {
      // console.log("login method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("login method go");

      this.Login();
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
  // margin-top: 100px;
  border-radius: 10px;
  // outline-style: dotted;
}
.title {
  text-align: center;
}
.welcome {
  // display: flex;
  margin-bottom: 40px;
  left: 0%;
  // right: 80px;
  // left:80px;
}
.login_btn {
  margin-top: 40px;
  text-align: center;
}
.reg_here {
  text-align: center;
}
</style>
