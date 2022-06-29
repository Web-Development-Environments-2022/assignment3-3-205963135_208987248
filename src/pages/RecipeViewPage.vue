<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <!-- <b-img :src="recipe.image" class="center" v-bind="mainProps" rounded="circle" alt="Circle image"></b-img> -->
        <img :src="recipe.image" class="center" border-radius="50%" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Likes: {{ recipe.popularity }} likes</div>
              <div>{{ recipe.servings }} servings</div>
            </div>
            <div class="ingredients">
              <h4>Ingredients:</h4>
              <ul>
                <li
                  v-for="(r, index) in recipe.ingredients"
                  :key="index + '_' + r.id"
                >
                  {{ r.original }}
                </li>
              </ul>
            </div>
          </div>
          <div class="wrapped instructions">
            <h4 class="headers">Instructions:</h4>
            <ol>
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      > -->
    </div>
  </div>
</template>

<script>
export default {
  name: "RecipeDetails",
  data() {
    return {
      recipe: undefined,
    };
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;

      try {
        this.$root.store.server_domain = "http://127.0.0.1:3000";
        let userName = this.$root.store.username;
        if (userName == undefined) {
          userName = "guest";
        }
        response = await this.axios.post(
          // "https://test-for-3-2.herokuapp.com/recipes/info",
          this.$root.store.server_domain + "/recipes/details",
          {
            userName: userName,
            recipeId: this.$route.params.recipeId,
          }
          // {
          //   params: { id: this.$route.params.recipeId }
          // }
        );

        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        analyzedInstructions,
        instructions,
        ingredients,
        popularity,
        readyInMinutes,
        image,
        title,
        servings,
      } = response.data;
      let _instructions = analyzedInstructions
        .map((fstep) => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
        .reduce((a, b) => [...a, ...b], []);

      let _recipe = {
        instructions,
        _instructions,
        analyzedInstructions,
        ingredients,
        popularity,
        readyInMinutes,
        image,
        title,
        servings,
      };

      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.recipe-header {
  text-align: center;
}

.ingredients {
  background-color: rgba(255, 228, 196, 0.418);
  padding: 5px;
  border-radius: 10px;
  width: 450px;
  margin-left: 50px;
}
.instructions {
  padding: 5px;
  border-radius: 10px;
  outline-style: dotted;
  height: 100%;
  width: 600px;
  margin-top: 100px;
}
.headers {
  text-align: center;
}
.mb-3 {
  background-color: rgba(240, 149, 14, 0.418);
  padding: 5px;
  border-radius: 10px;
  height: 85px;
  width: 200px;
  margin-left: 450px;
}
</style>
