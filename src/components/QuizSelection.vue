<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "@/stores/main";
import { twMerge as twm } from "tailwind-merge";

const store = useStore();

const ICO_BG_CLASSES =
  "mr-3 mt-2 flex h-9 w-9 shrink-0 items-center rounded-full bg-pink-400 dark:bg-teal-600";

const BASE_ICO_CLASSES =
  "mdi mdi-counter m-auto text-xl text-neutral-100 dark:text-neutral-900";

const LABEL_CLASSES = twm(
  "block w-full border-pink-300/75 text-left text-sm font-semibold text-neutral-500/75 dark:border-teal-300/75 dark:text-neutral-200",
);

const INPUT_CLASSES = twm(
  "mx-auto mt-1 w-full border-0 border-t-2 border-neutral-300 bg-transparent px-0 py-1 text-base font-semibold text-neutral-700 focus:border-pink-400 focus:text-pink-500 focus:shadow-md focus:shadow-pink-200/50 focus:ring-0 dark:border-neutral-900 dark:text-neutral-500 dark:focus:border-neutral-700 dark:focus:text-neutral-200 dark:focus:shadow-neutral-800/25 md:py-1.5",
);

const setAmount = (e) => {
  store.setQuizAmount(parseInt(e.target.value));
};

const setCategory = (e) => {
  store.setQuizCategory(parseInt(e.target.value));
};

const setDifficulty = (e) => {
  store.setQuizDifficulty(e.target.value);
};

const isDisabled = ref(false);

const getQuiz = () => {
  isDisabled.value = true;
  setTimeout(() => {
    store.getTriviaQuestions();
  }, 200);
  // isDisabled
};

onMounted(() => {
  document.title = "Select Your Quiz";
});
</script>

<template>
  <form
    class="mx-auto flex w-full max-w-4xl flex-col justify-center pt-10 lg:py-8"
    @submit.prevent="getQuiz"
  >
    <div class="mb-16 flex h-auto flex-col items-center md:mb-8">
      <div class="my-10 flex w-4/5 max-w-sm md:my-8">
        <div :class="ICO_BG_CLASSES">
          <span :class="twm(BASE_ICO_CLASSES, 'mdi-counter')"></span>
        </div>
        <div class="h-auto w-full">
          <label for="amount" :class="LABEL_CLASSES">Questions amount</label>
          <input
            type="number"
            id="amount"
            min="1"
            max="50"
            :class="INPUT_CLASSES"
            :value="store.quizOptions.amount"
            @change="setAmount"
          />
        </div>
      </div>

      <div class="my-10 flex w-4/5 max-w-sm md:my-8">
        <div :class="ICO_BG_CLASSES">
          <span :class="twm(BASE_ICO_CLASSES, 'mdi-flask')"></span>
        </div>
        <div class="h-auto w-full">
          <label for="category" :class="LABEL_CLASSES">Category</label>
          <select
            id="category"
            :class="INPUT_CLASSES"
            :value="store.quizOptions.category"
            @change="setCategory"
          >
            <option value="0">Any</option>
            <option
              v-for="(cat, index) in store.categories"
              :value="cat.id"
              :key="index"
            >
              {{ cat.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="my-10 flex w-4/5 max-w-sm md:my-8">
        <div :class="ICO_BG_CLASSES">
          <span :class="twm(BASE_ICO_CLASSES, 'mdi-gauge')"></span>
        </div>
        <div class="h-auto w-full">
          <label for="difficulty" :class="LABEL_CLASSES">Difficulty</label>
          <select
            id="difficulty"
            :class="INPUT_CLASSES"
            :value="store.quizOptions.difficulty"
            @change="setDifficulty"
          >
            <option value="any">Any</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>
    </div>

    <button
      class="mx-auto h-auto w-full transform cursor-pointer bg-neutral-200 p-9 text-2xl font-semibold leading-5 text-neutral-700 transition hover:bg-neutral-200/25 hover:text-pink-400 hover:shadow-sm active:bg-pink-300 active:text-neutral-50 dark:bg-neutral-800/50 dark:text-neutral-400 dark:hover:bg-neutral-700/50 dark:hover:text-teal-400 dark:active:bg-teal-300 dark:active:text-neutral-800 md:mb-4 md:max-w-xs md:rounded md:p-6"
      type="submit"
      :disabled="isDisabled"
    >
      <span class="mdi mdi-play-circle"></span>
      GO!
    </button>
  </form>
</template>
