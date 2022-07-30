<template>
  <div class="wrapped instructions">
    <h4 class="headers">Instructions:</h4>
    <ol>
      <li v-for="s in this.instructions" :key="s.number">
        {{ s.step }}
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "Instructions",
  props: {
    Instructions: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
.headers {
  text-align: center;
}

.instructions {
  padding: 5px;
  border-radius: 10px;
  outline-style: dotted;
  height: 100%;
  width: 600px;
  margin-top: 100px;
}

.wrapped {
  width: 50%;
}
</style>