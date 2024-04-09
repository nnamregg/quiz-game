<script setup>
import { twMerge as twm } from "tailwind-merge";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const LABEL_CLASSES =
  "block w-full border-pink-300/75 text-left text-base font-semibold text-neutral-500 md:text-lg dark:border-teal-300/75 dark:text-neutral-200";
</script>

<template>
  <label :for="name" :class="twm(LABEL_CLASSES)">{{ label }}</label>
</template>
