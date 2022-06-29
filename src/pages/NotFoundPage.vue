<template>
  <div class="container">
    <h1 class="title">The page you are looking for...</h1>
    <img
      class="image"
      src="@/assets/not-found.png"
      width="300"
      height="300"
      id="icon"
    />
    <router-link class="link" to="/" exact
      ><b-button variant="danger">Back TO Home page</b-button></router-link
    >
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
.title {
  text-align: center;
  margin-top: 100px;
  margin-bottom: 100px;
}
.link {
  text-align: center;
  margin-left: 250px;
  margin-top: 200px;
  font-size: x-large;
}
.image {
  margin-left: 480px;
}
</style>
