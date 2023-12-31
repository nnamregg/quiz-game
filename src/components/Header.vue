<script setup>
import ThemeSelector from "@/components/ThemeSelector.vue";
</script>

<template>
  <header class="w-full p-6">
    <img
      src="logo-alt.svg"
      alt="Logo Yet Another Trivia Game"
      class="mx-auto mb-2 mt-2 lg:mt-6"
      width="180"
    />
    <h1
      class="mx-auto max-w-fit cursor-none text-sm font-semibold tracking-wider text-neutral-500 dark:text-neutral-400/75"
    >
      Yet Another Trivia Game
    </h1>
    <ThemeSelector />
  </header>
</template>
