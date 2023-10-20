<script setup>
import { onMounted } from "vue";
import { useStore } from "@/stores/main";
import Header from "@/components/Header.vue";
import QuizSelection from "@/components/QuizSelection.vue";
import Quiz from "@/components/Quiz/Main.vue";
import FinalScore from "@/components/FinalScore.vue";

const store = useStore();

onMounted(() => {
  store.getCategories();
});
</script>

<template>
  <Header />
  <main
    class="mx-auto mb-8 mt-1 box-border flex h-full w-11/12 max-w-3xl overflow-hidden rounded-md bg-neutral-100/75 shadow-md backdrop-blur-sm hover:shadow-lg dark:bg-neutral-950/75"
  >
    <QuizSelection v-if="!store.quizLength" />

    <Quiz v-else-if="store.currentQuestion" />

    <FinalScore v-else-if="store.index >= store.quizLength" />
  </main>
</template>
