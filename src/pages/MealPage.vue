<template>
  <div class="meal">
    <h1 class="title">Your Meal</h1>
    <div class="div-buttons">
      <b-button
        class="all_btn_meal"
        pill
        variant="warning"
        @click="reorderMealRecipes"
        >Reorder Meal Recipes</b-button
      ><b-button
        class="all_btn_meal"
        pill
        variant="warning"
        @click="clearAllRecipes"
        >Clear All Recipes</b-button
      >
    </div>
    <b-container fluid class="p-4 all_recipes">
      <b-row class="row" v-for="(r, index1) in this.recipes" :key="index1">
        <div class="recipe-container">
          <RecipePreview
            class="recipePreview"
            :recipe="r"
            :id="r.id"
            :title="r.title"
            :readyInMinutes="r.readyInMinutes"
            :image="r.image"
            :aggregateLikes="r.aggregateLikes == undefined ? r.popularity : r.aggregateLikes"
            :isFavorite="r.isFavorite"
            :isLastseen="r.isLastseen"
            :index="index1 + 1"
          />

          <div class="dowm-buttons-div">
            <b-button
              class="down-buttons"
              pill
              variant="danger"
              @click="() => deleteFromMeal(r)"
              >Delete From Meal</b-button
            >
            <b-button class="down-buttons" pill variant="success"
              ><span
                >Progress:
                <strong
                  >{{ progressBarDataDone[r.id] }}
                  /
                  {{ progressBarDataTotal[r.id] }}</strong
                ></span
              ></b-button
            >
          </div>
        </div>
      </b-row>
    </b-container>
    <b-modal id="my-modal" v-model="showModal">
      <h4>
        Please enter the new recipes order by stating there there numbers with
        commas between them:
      </h4>
      <b-form @submit="onSubmit" inline>
        <b-form-group
          id="title"
          label="New Recipes Order: "
          label-for="newOrderTitle"
          class="recipe_name"
        >
          <b-form-input
            id="newOrderTitle"
            class="orderInput"
            v-model="newOrder"
            placeholder="Enter the new recipes order"
            required
          ></b-form-input>
        </b-form-group>
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
  </div>
</template>

<script>
import RecipePreview from "../components/RecipePreview.vue";
export default {
  name: "MealPage",
  components: {
    RecipePreview,
  },
  async mounted() {
    try {
      await this.updateMeal();
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      progressBarDataTotal: {},
      progressBarDataDone: {},
      value: 0,
      max: 1,
      recipes: [],
      showModal: false,
      newOrder: "",
    };
  },
  methods: {
    async updateMeal() {
      let curRecipes = JSON.parse(sessionStorage.getItem("mealRecipes"));
      curRecipes.forEach((recipe) => {
        this.recipes.push(JSON.parse(JSON.stringify(recipe)));
      });
      let instructionsLength = JSON.parse(
        sessionStorage.getItem("mealRecipesInstructionLength")
      );
      if (instructionsLength != undefined) {
        instructionsLength.forEach((element) => {
          this.progressBarDataTotal[element.recipeId.toString()] =
            element.numberOfInstructions;
          this.progressBarDataDone[element.recipeId.toString()] = 0;
        });
      }
      let curInstructions = JSON.parse(
        sessionStorage.getItem("curInstructions")
      );
      if (curInstructions != undefined) {
        curInstructions.forEach((element) => {
          this.progressBarDataDone[element.recipeId.toString()] =
            element.finishedInstructions;
        });
      }
    },
    async deleteFromMeal(recipe) {
      try {
        this.$root.store.server_domain = "https://dm-recipes.cs.bgu.ac.il";
        let recipeNewOrder = [];
        let index = 0;
        let newRecipes = [];
        this.recipes.forEach((r) => {
          if (r.id != recipe.id) {
            recipeNewOrder.push({ recipeId: r.id, orderRecipe: index });
            index++;
            newRecipes.push(r);
          }
        });
        const response = await this.axios.post(
          this.$root.store.server_domain + "/recipes/deletemeal",
          {
            recipeId: recipe.id,
            userName: this.$root.store.username,
            recipesAndOrderList: recipeNewOrder,
          }
        );
        let meal = await this.axios.post(
          this.$root.store.server_domain + "/recipes/meal",
          { userName: this.$root.store.username }
        );
        sessionStorage.setItem(
          "recipesInMeal",
          JSON.stringify(meal.data.length)
        );
        sessionStorage.setItem(
          "mealRecipesInstructionLength",
          JSON.stringify(meal.data)
        );
        sessionStorage.setItem("mealRecipes", JSON.stringify(newRecipes));
        this.recipes = newRecipes;
      } catch (error) {
        console.log(error);
      }
    },
    async reorderMealRecipes() {
      this.showModal = true;
    },
    async onSubmit() {
      try {
        this.$root.store.server_domain = "https://dm-recipes.cs.bgu.ac.il";
        this.showModal = false;
        let newOrderList = this.newOrder.split(",");
        let newOrderListInt = [];
        newOrderList.forEach((num) => {
          let newNum = parseInt(num);
          if (!isNaN(newNum)) {
            newOrderListInt.push(newNum);
          } else {
            alert("Please enter numbers only!");
          }
        });
        let orderList = [];
        let index = 0;
        let newRecipes = [];
        newOrderListInt.forEach((num) => {
          orderList.push({
            recipeId: this.recipes[num - 1].id,
            orderRecipe: index,
          });
          index++;
          newRecipes.push(this.recipes[num - 1]);
        });
        const response = await this.axios.post(
          this.$root.store.server_domain + "/recipes/changemealorder",
          {
            userName: this.$root.store.username,
            recipesAndOrderList: orderList,
          }
        );
        if (response.data == "Meal order was updated successfully") {
          this.recipes = newRecipes;
          sessionStorage.setItem("mealRecipes", JSON.stringify(newRecipes));
        }
      } catch (e) {
        console.log(e);
      }
    },
    async clearAllRecipes() {
      this.$root.store.server_domain = "https://dm-recipes.cs.bgu.ac.il";
      const response = await this.axios.post(
        this.$root.store.server_domain + "/recipes/deletemealrecipes",
        {
          userName: this.$root.store.username,
        }
      );
      let meal = await this.axios.post(
        this.$root.store.server_domain + "/recipes/meal",
        { userName: this.$root.store.username }
      );
      sessionStorage.setItem("recipesInMeal", JSON.stringify(meal.data.length));
      sessionStorage.setItem(
        "mealRecipesInstructionLength",
        JSON.stringify(meal.data)
      );
      sessionStorage.setItem("mealRecipes", JSON.stringify([]));
      this.recipes = [];
    },
  },
};
</script>

<style>
.title {
  text-align: center;
  margin-top: 20px;
}
.all_recipes {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}
.all_btn_meal {
  color: rgb(0, 0, 0) !important;
  font-weight: bold !important;
}
.meal {
  color: black !important;
  width: 100%;
  height: 100%;
  position: absolute;
}
.recipe_name {
  margin-top: 30px;
  font-weight: bold;
  margin: 10px;
}
.orderInput {
  width: 250px !important;
  height: 30px !important;
}
.div-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}
.dowm-buttons-div {
  display: flex;
  gap: 30px;
  margin-top: 30px !important;
  margin-left: 80px;
}
</style>