<script setup>
import { onMounted, computed, ref } from "vue";
import { useStore } from "@/stores/main";
import Header from "@/components/Header.vue";
import MainMenu from "@/views/MainMenuView.vue";
import Quiz from "@/views/QuizView.vue";
import Results from "@/views/ResultsView.vue";

const store = useStore();

const VIEWS = {
  "MAIN_MENU": MainMenu,
  "QUIZ": Quiz,
  "RESULTS": Results
};

const isQuizActive = computed(() => (store.quizLength ? true : false));
const isQuizFinished = computed(
  () =>
    store.quizLength &&
    (store.index === null || store.index >= store.quizLength),
);

const currentView = computed(() => {
  if (isQuizFinished.value) return VIEWS["RESULTS"];
  return !isQuizActive.value ? VIEWS["MAIN_MENU"] : VIEWS["QUIZ"];
});

onMounted(() => {
  store.getCategories();
});
</script>

<template>
  <Header />
  <main
    class="mx-auto mb-8 mt-1 box-border flex h-full w-11/12 max-w-3xl overflow-hidden rounded-md bg-neutral-100/75 shadow-md backdrop-blur-sm hover:shadow-lg dark:bg-neutral-950/75"
  >
    <component :is="currentView" :isTimedOut="store.index === null"></component>
  </main>
</template>
