<script setup>
import { onMounted } from "vue";
import { useStore } from "@/stores/main";
// import DarkModeSelector from "@/components/DarkModeSelector.vue";
import QuizSelection from "@/components/QuizSelection.vue";
import Quiz from "@/components/Quiz/Main.vue";
import FinalScore from "@/components/FinalScore.vue";

const store = useStore();

onMounted(() => {
  store.getCategories();
});
</script>

<template>
  <main
    class="mx-auto my-8 box-border flex h-full w-full max-w-4xl overflow-hidden rounded bg-neutral-100/75 shadow-md backdrop-blur-sm hover:shadow-lg dark:bg-neutral-950/75 md:my-20 lg:my-32"
  >
    <QuizSelection v-if="!store.quizLength" />

    <Quiz v-else-if="store.currentQuestion" />

    <FinalScore v-else-if="store.index >= store.quizLength" />
  </main>
</template>
