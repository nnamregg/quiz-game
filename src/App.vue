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
    class="relative mx-auto my-8 flex h-auto min-h-[90vh] w-full max-w-2xl overflow-hidden rounded bg-neutral-100/75 shadow-md backdrop-blur-sm hover:shadow-lg dark:bg-neutral-950/50 md:h-[80vh] md:min-h-0 lg:max-w-4xl 2xl:h-[60vh]"
  >
    <QuizSelection v-if="!store.quizLength" />

    <Quiz v-else-if="store.currentQuestion" />

    <FinalScore v-else-if="store.index >= store.quizLength" />

    <!--
    TODO: mover ~~DarkModeSelector~~ ThemeSelector a <Header />
    <div
      class="absolute right-24 top-6 md:relative md:right-0 md:float-right md:my-auto md:h-3/5"
    >
      <DarkModeSelector />
    </div> -->
  </main>
</template>
