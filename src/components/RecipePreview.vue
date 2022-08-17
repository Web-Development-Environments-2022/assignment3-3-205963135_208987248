<template>
  <b-container>
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
            <img
              src="@/assets/vegetarian.png"
              width="30"
              height="30"
              id="icon"
            />
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
        <iconBar
          :isFavorite="isFavorite"
          :isLastseen="isLastseen"
          :recipe="recipe"
        ></iconBar>
        <div class="recipe-index">{{ index }}</div>
      </div>
    </div>
  </b-container>
</template>

<script>
import iconBar from "../components/iconBar.vue";
export default {
  name: "RecipePreview",
  components: {
    iconBar,
  },
  mounted() {
    // console.log(this.recipe);
    this.axios
      .get(this.recipe.image, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((res) => {
        this.image_load = true;
      })
      .catch((err) => console.log(err));
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
    isFavorite: {
      type: Boolean,
      required: true,
    },
    isLastseen: {
      type: Boolean,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.recipe-container {
  background-color: rgb(255, 253, 249);
  border-radius: 10px;
  border-style: ridge;
  width: 26rem;
  height: 32rem;
}

.recipe-image {
  width: 25.8rem;
  height: 14rem;
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
  word-wrap: break-word;
}

.recipe-overview {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.recipe-index {
  text-align: center;
  margin-top: -35px;
  font-size: larger;
  font-weight: 400;
}

#icon {
  margin-left: 50px;
}
</style>
