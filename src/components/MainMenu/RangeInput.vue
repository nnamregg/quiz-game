<script setup>
import { useStore } from "@/stores/main";

const store = useStore();

const props = defineProps({
  attributes: {
    type: Object,
    default: {},
  },
  setOption: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <input
    v-bind="attributes"
    :id="attributes.name"
    :value="store.quizOptions[attributes.name]"
    @input="setOption"
    class="mx-0 my-2 h-2 w-full cursor-pointer appearance-none rounded-full border-2 border-pink-300 bg-pink-200 px-1 shadow-pink-400 hover:bg-pink-300 hover:shadow-md focus:bg-pink-400 dark:border-teal-700 dark:bg-teal-800 dark:shadow-teal-200 dark:hover:bg-teal-700 dark:focus:bg-teal-500"
  />
</template>

<style scoped>
* {
  --bg: #f9a8d4;
  --bg-focus: #fbcfe8;
  --border: #f472b6;
  --bg-dark: #14b8a6;
  --bg-focus-dark: #2dd4bf;
  --border-dark: #115e59;
}

/* chromium + edge */
input[type="range"]::-webkit-slider-thumb {
  border: 2px solid var(--border);
  height: 18px;
  width: 18px;
  border-radius: 100%;
  background: var(--bg);
  cursor: pointer;
  -webkit-appearance: none;
}

input[type="range"]:hover::-webkit-slider-thumb,
input[type="range"]:focus::-webkit-slider-thumb {
  background: var(--bg-focus);
}

html.dark input[type="range"]::-webkit-slider-thumb {
  border-color: var(--border-dark);
  background: var(--bg-dark);
}

html.dark input[type="range"]:hover::-webkit-slider-thumb,
html.dark input[type="range"]:focus::-webkit-slider-thumb {
  background: var(--bg-focus-dark);
}

/* mozilla */
input[type="range"]::-moz-range-thumb {
  border: 2px solid var(--border);
  height: 14px;
  width: 14px;
  border-radius: 100%;
  background: var(--bg);
  cursor: pointer;
}

input[type="range"]:hover::-moz-range-thumb,
input[type="range"]:focus::-moz-range-thumb {
  background: var(--bg-focus);
}

html.dark input[type="range"]::-moz-range-thumb {
  border-color: var(--border-dark);
  background: var(--bg-dark);
}

html.dark input[type="range"]:hover::-moz-range-thumb,
html.dark input[type="range"]:focus::-moz-range-thumb {
  background: var(--bg-focus-dark);
}
</style>
