<template>
  <div class="wrapped instructions">
    <h4 class="headers">Instructions:</h4>
    <ol>
      <li v-for="s in this.Instructions" :key="s.number" class="instruction">
        <input
          v-if="prepared"
          :id="s.number"
          type="checkbox"
          :checked="s.checked"
          @change="() => onChange(s)"
        />
        <span :id="'step' + s.number">
          {{ s.step }}
        </span>
      </li>
    </ol>
    <!-- <button @click="func">click</button> -->
  </div>
</template>

<script>
import { yellow } from "color-name";

export default {
  name: "Instructions",
  props: {
    Instructions: {
      type: Array,
      required: true,
    },
    prepared: {
      type: Boolean,
      required: true,
    },
    recipeId: {
      type: String,
      required: true,
    },
  },
  mounted() {
    // this.Instructions[0].checked = true;
    let recipe = JSON.parse(sessionStorage.getItem("curRecipe"));
    let recipeId = recipe.id;
    let curInstructions = JSON.parse(sessionStorage.getItem("curInstructions"));
    let newInstructions = curInstructions.find(
      (element) => element.recipeId == recipeId
    );
    // console.log("here");
    // console.log(newInstructions);
    if (newInstructions != undefined) {
      // console.log("here1");
      newInstructions = newInstructions.instructions;
      newInstructions.forEach((instruction) => {
        if (instruction.checked) {
          // console.log("here2");
          document.getElementById(instruction.number).checked = true;
          document.getElementById(
            "step" + instruction.number
          ).style.background = "yellow";
        } else {
          document.getElementById(
            "step" + instruction.number
          ).style.background = "transparent";
        }
      });
    }
  },
  updated() {
    let recipe = JSON.parse(sessionStorage.getItem("curRecipe"));
    let recipeId = recipe.id;
    let curInstructions = JSON.parse(sessionStorage.getItem("curInstructions"));
    let newInstructions = curInstructions.find(
      (element) => element.recipeId == recipeId
    );
    // console.log("here");
    // console.log(newInstructions);
    if (newInstructions != undefined) {
      // console.log("here1");
      newInstructions = newInstructions.instructions;
      newInstructions.forEach((instruction) => {
        if (instruction.checked) {
          // console.log("here2");
          document.getElementById(instruction.number).checked = true;
          console.log(document.getElementById("step" + instruction.number));
          document.getElementById(
            "step" + instruction.number
          ).style.background = "yellow";
        } else {
          document.getElementById(
            "step" + instruction.number
          ).style.background = "transparent";
        }
      });
    }
  },
  methods: {
    onChange(instruction) {
      // console.log(instruction);
      instruction.checked = !instruction.checked;
      let curInstructions = JSON.parse(
        sessionStorage.getItem("curInstructions")
      );
      // console.log(curInstructions);
      let oldInstructions = curInstructions.find(
        (element) => element.recipeId == this.recipeId
      );
      // console.log(oldInstructions);
      let index = instruction.number - 1;
      oldInstructions.instructions[index] = instruction;
      // console.log(oldInstructions);
      const instructionIndex = curInstructions.findIndex(
        (o) => o.recipeId == this.recipeId
      );
      // console.log(instructionIndex);
      if (instructionIndex > -1) {
        curInstructions[instructionIndex] = oldInstructions;
      }
      // console.log(curInstructions);
      sessionStorage.setItem(
        "curInstructions",
        JSON.stringify(curInstructions)
      );
      if (instruction.checked) {
        document.getElementById("step" + instruction.number).style.background =
          "yellow";
      } else {
        document.getElementById("step" + instruction.number).style.background =
          "transparent";
      }
    },
    // func() {
    //   document.getElementById(1).checked = true;
    //   console.log("clicked");
    // },
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
.checkbox-form .item:hover input ~ .instruction {
  background-color: yellow;
}
</style>