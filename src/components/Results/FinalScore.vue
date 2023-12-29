<script setup>
const props = defineProps({
  ico: {
    type: String,
    required: true
  },
  txt: {
    type: String,
    required: true
  },
  score: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div
    class="anim-top mx-auto w-fit items-center justify-between rounded border-2 border-pink-200 bg-pink-200/50 pb-1.5 text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-teal-300/75"
  >
    <span
      class="block bg-pink-200 pb-1 text-center text-sm font-semibold text-neutral-600 dark:bg-neutral-700 dark:text-neutral-900"
      >FINAL SCORE</span
    >
    <span class="mx-6 my-1.5 block rounded text-3xl font-bold"
      >{{ props.score[0] }} / {{ props.score[1] }}</span
    >
  </div>

  <div class="anim-center mx-auto my-14 max-w-md">
    <span class="mdi text-8xl" :class="props.ico"></span>
    <p class="mt-1 text-4xl lg:text-5xl">{{ props.txt }}</p>
  </div>
</template>
