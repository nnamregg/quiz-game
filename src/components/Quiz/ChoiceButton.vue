<script setup>
import { ref, computed, onUpdated } from "vue";
import { twMerge as twm } from "tailwind-merge";

const isSelected = ref(false);

const props = defineProps({
  correct: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(["handleAnswer"]);

const CHOICE_BASE_CLASSES =
  "py-auto flex h-16 transform cursor-pointer items-center justify-center bg-neutral-200 px-1 text-sm font-semibold transition duration-75 hover:bg-neutral-200/25 active:bg-pink-300 dark:bg-neutral-800/10 dark:hover:bg-neutral-700/25 dark:active:bg-teal-400/75 md:h-20 lg:text-base";

const choiceClasses = computed(() => {
  return twm(
    CHOICE_BASE_CLASSES,
    isSelected.value && (props.correct ? "!bg-green-500" : "!bg-red-500"),
  );
});

onUpdated(() => {
  setTimeout(() => {
    isSelected.value = false;
  }, 1000);
});

function btnClick() {
  isSelected.value = true;
  emit("handleAnswer");
}
</script>

<template>
  <button :class="choiceClasses" @click="btnClick" :disabled="isSelected">
    <slot> </slot>
  </button>
</template>
