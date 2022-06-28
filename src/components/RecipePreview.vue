<template>
  <div class="recipe-container">
    <router-link
      :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
      class="recipe-preview"
    >
      <img v-if="image_load" :src="recipe.image" class="recipe-image" />
    </router-link>
    <div class="recipe-footer">
      <h5 :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </h5>
      <ul class="recipe-overview">
        <li>{{ this.recipe.readyInMinutes }} minutes</li>
        <li>
          {{
            this.recipe.aggregateLikes == undefined
              ? this.recipe.popularity
              : this.recipe.aggregateLikes
          }}
          likes
        </li>
        <tamplate v-if="recipe.vegan">
          <img src="@/assets/vegan.png" width="30" height="30" id="icon" />
        </tamplate>
        <tamplate v-if="recipe.vegetarian">
          <img src="@/assets/vegetarian.png" width="30" height="30" id="icon" />
        </tamplate>
        <tamplate v-if="recipe.glutenFree">
          <img
            src="@/assets/gluten-free.png"
            width="30"
            height="30"
            id="icon"
          />
        </tamplate>
      </ul>
      <!-- <v-app>
        <v-btn fab depressed small dark color="red">
          <v-icon>favorite</v-icon>
        </v-btn></v-app
      > -->
      <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id } }">
        <b-button id="recipe_link" variant="warning">Go to recipe</b-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecipePreview",
  mounted() {
    this.axios
      .get(this.recipe.image, {
        headers: { "Access-Control-Allow-Origin": "http://127.0.0.1:3000" },
      })
      .then((res) => {
        this.image_load = true;
      })
      .catch((err) => console.log(err));
    console.log(this.recipe);
  },
  data() {
    return {
      image_load: true,
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    readyInMinutes: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    aggregateLikes: {
      type: Number,
      required: false,
      default() {
        return 0;
      },
    },
  },
};
</script>

<style scoped>
.recipe-container {
  background-color: rgb(255, 253, 249);
  border-radius: 10px;
  border-style: ridge;
  width: 20rem;
  height: 27rem;
}

.recipe-image {
  width: 100%;
  border-radius: 10px 10px 0 0;
}

.recipe-image:hover {
  opacity: 0.3;
}

.recipe-footer {
  text-align: left;
  padding: 20px;
}

.recipe-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
}

.recipe-overview {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

#recipe_link {
  margin-left: 75px;
  margin-top: 40px;
}
#icon {
  margin-left: 50px;
}

/* .recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
} */
</style>
