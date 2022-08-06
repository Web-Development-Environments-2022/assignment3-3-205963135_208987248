import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/myrecipes",
    name: "myrecipes",
    component: () => import("./pages/MyRecipesPage"),
  },
  {
    path: "/myfamilyrecipes",
    name: "myfamilyrecipes",
    component: () => import("./pages/MyFamilyRecipesPage"),
  },
  {
    path: "/prepareRecipe",
    name: "PrepareRecipe",
    component: () => import("./pages/PrepareRecipePage"),
  },
  {
    path: "/myfavoriterecipes",
    name: "myfavoriterecipes",
    component: () => import("./pages/MyFavoriteRecipesPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
