<script setup>
import { ref, onUpdated } from "vue";
import { twMerge as twm } from "tailwind-merge";
import Button from "../Button.vue";

const isSelected = ref(false);

const props = defineProps({
  correct: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(["handleAnswer"]);

onUpdated(() => {
  setTimeout(() => {
    isSelected.value = false;
  }, 1000);
});

function onClick() {
  isSelected.value = true;
  emit("handleAnswer");
}
</script>

<template>
  <Button
    :class="
      twm(isSelected && (props.correct ? '!bg-green-500' : '!bg-red-500'))
    "
    :disabled="isSelected"
    @action="onClick"
  >
    <slot> </slot>
  </Button>
</template>
