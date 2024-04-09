<script setup>
import { computed, defineAsyncComponent } from "vue";
import { useStore } from "@/stores/main";
import { gsap } from "gsap";
import Header from "@/components/Header.vue";
import AlertTransition from "@/components/AlertTransition.vue";

const store = useStore();

const VIEWS = {
  MAIN_MENU: defineAsyncComponent(() => import("@/views/MainMenuView.vue")),
  QUIZ: defineAsyncComponent(() => import("@/views/QuizView.vue")),
  RESULTS: defineAsyncComponent(() => import("@/views/ResultsView.vue")),
};

const Alert = defineAsyncComponent(() => import("@/components/Alert.vue"));

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

const hasError = computed(() => (store.fetchError ? true : false));
const errorStr = computed(
  () =>
    `${store.fetchError.code} - ${store.fetchError.name}: ${store.fetchError.message}`,
);

function onBeforeEnter(el) {
  gsap.set(el, {
    opacity: 0,
  });
}

function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    duration: 0.25,
    ease: "expo.in",
    onComplete: done,
  });
}

function onLeave(el, done) {
  gsap.to(el, {
    opacity: 0,
    duration: 0.25,
    ease: "expo.out",
    onComplete: done,
  });
}
</script>

<template>
  <AlertTransition>
    <Alert
      v-if="hasError"
      :text="errorStr"
      :ico="'mdi-alert-circle'"
      @on-close="store.clearFetchError"
    />
  </AlertTransition>

  <Header />
  <main class="h-full flex-grow px-4 py-4 md:px-8 md:py-8 2xl:pb-20">
    <div
      class="mx-auto box-border flex min-h-[600px] w-full overflow-hidden rounded-md border-2 border-neutral-300 bg-pink-50 md:max-w-3xl dark:border-neutral-900 dark:bg-neutral-950"
    >
      <Transition
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
        :css="false"
        mode="out-in"
        appear
      >
        <component :is="currentView"></component>
      </Transition>
    </div>
  </main>
</template>
