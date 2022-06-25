<template>
<div  id="app">
  <div id="nav">
  <b-navbar toggleable="lg" type="light" variant="warning">
    <b-navbar-brand>

        <b-button pill variant="outline-secondary"><router-link :to="{ name: 'main' }">Vue Recipes</router-link></b-button>

      
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item >
          <b-button pill variant="outline-secondary"><router-link :to="{ name: 'search' }">Search</router-link></b-button>
          
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!-- {{ !$root.store.username }} -->
      <span v-if="!$root.store.username">
        <!-- Guest: -->
        <b-button pill variant="outline-secondary"><router-link :to="{ name: 'register' }">Register</router-link></b-button>
        <b-button pill variant="outline-secondary"><router-link :to="{ name: 'login' }">Login</router-link></b-button>
      </span>
      <span v-else>
        {{ $root.store.username }}:
         <b-button pill variant="outline-secondary" @click="Logout">Logout</b-button>
      </span>
        
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  </div>
  <router-view />
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
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family:cursive;
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
</style>
