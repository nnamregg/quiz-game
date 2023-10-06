<script setup>
import { ref, computed, onUpdated } from "vue";
import { twMerge as twm } from "tailwind-merge";

const selected = ref(false);
const choiceRef = ref(null);

const props = defineProps({
  correct: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(["handleAnswer"]);

const CHOICE_BASE_CLASSES =
"flex justify-center items-center h-16 md:h-20 text-sm lg:text-base font-semibold px-1 py-auto cursor-pointer transition transform duration-75 bg-neutral-200 hover:bg-pink-400 hover:text-neutral-100 dark:bg-neutral-800/10 dark:hover:bg-pink-500";

const choiceClasses = computed(() => {
  return twm(
    CHOICE_BASE_CLASSES,
    selected.value && (props.correct ? "!bg-green-500" : "!bg-red-500")
  )
});

onUpdated(() => {
  setTimeout(() => {
    selected.value = false;
  }, 1000)
})

function btnClick() {
  selected.value = true;
  emit("handleAnswer");
}

</script>

<template>
  <button ref="choiceRef" :class="choiceClasses" @click="btnClick" :disabled="selected">
    <slot> </slot>
  </button>
</template>
