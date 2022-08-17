<template>
  <div class="wrapped instructions">
    <h4>Instructions:</h4>
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
    this.updateInstruction();
  },
  updated() {
    this.updateInstruction();
  },
  methods: {
    updateInstruction() {
      try {
        let curInstructions = JSON.parse(
          sessionStorage.getItem("curInstructions")
        );
        if (curInstructions != undefined) {
          let newInstructions = curInstructions.find(
            (element) => element.recipeId == this.recipeId
          );
          if (newInstructions != undefined) {
            newInstructions = newInstructions.instructions;
            newInstructions.forEach((instruction) => {
              if (instruction.checked) {
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
        }
      } catch (e) {
        console.log(e);
      }
    },
    onChange(instruction) {
      try {
        instruction.checked = !instruction.checked;
        let curInstructions = JSON.parse(
          sessionStorage.getItem("curInstructions")
        );
        let oldInstructions = curInstructions.find(
          (element) => element.recipeId == this.recipeId
        );
        let index = instruction.number - 1;
        oldInstructions.instructions[index] = instruction;
        const instructionIndex = curInstructions.findIndex(
          (o) => o.recipeId == this.recipeId
        );
        if (instruction.checked) {
          oldInstructions.finishedInstructions += 1;
        } else {
          oldInstructions.finishedInstructions -= 1;
        }
        if (instructionIndex > -1) {
          curInstructions[instructionIndex] = oldInstructions;
        }
        sessionStorage.setItem(
          "curInstructions",
          JSON.stringify(curInstructions)
        );
        if (instruction.checked) {
          document.getElementById(
            "step" + instruction.number
          ).style.background = "yellow";
        } else {
          document.getElementById(
            "step" + instruction.number
          ).style.background = "transparent";
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style>
.instructions {
  padding: 5px;
  border-radius: 10px;
  outline-style: dotted;
  width: 600px !important;
}
.checkbox-form .item:hover input ~ .instruction {
  background-color: yellow;
}
</style>