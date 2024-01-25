<script setup>
import { twMerge as twm } from "tailwind-merge";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  ico: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["onClose"]);
</script>

<template>
  <div
    id="alert"
    class="fixed bottom-2 left-1/2 z-50 mb-4 flex w-11/12 max-w-3xl -translate-x-1/2 items-center rounded-md border-t-4 border-red-300 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-neutral-950/95 dark:text-red-400"
    role="alert"
  >
    <span :class="twm('mdi flex-shrink-0', props.ico)" aria-hidden="true">
    </span>
    <div class="ms-3 text-sm font-semibold">
      {{ props.text }}
    </div>
    <button
      type="button"
      class="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 p-1.5 text-red-500 hover:bg-red-200 focus:ring-2 focus:ring-red-400 dark:bg-neutral-900 dark:text-red-400 dark:hover:bg-gray-700"
      data-dismiss-target="#alert"
      aria-label="Close"
      @click="emit('onClose')"
    >
      <span class="sr-only">Dismiss</span>
      <span class="mdi mdi-close"></span>
    </button>
  </div>
</template>
