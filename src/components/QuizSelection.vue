<script setup>
import { onMounted } from "vue";
import { useStore } from "@/stores/main";
import { twMerge as twm } from "tailwind-merge";

const store = useStore();

/**
 * TODO: tailwind-merge
 * * Important
 * ! Deprecated
 * ? Query
 * @param someParam Comment about param
 */

const labelClasses = twm(
  "block mb-2 text-base lg:text-base font-semibold italic text-neutral-800 dark:text-neutral-200 inline",
);

const inputClasses = twm(
  "block border-0 border-b-2 text-base mx-auto w-2/3 md:w-1/2 p-2 md:p-2.5 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 focus:shadow-lg focus:border-pink-500 focus:text-pink-500 focus:ring-0",
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

const getQuiz = () => {
  setTimeout(() => {
    store.getTriviaQuestions();
  }, 200);
};

onMounted(() => {
  document.title = "Select Your Quiz";
});
</script>

<template>
  <div class="mx-auto flex h-full max-w-xl flex-col justify-evenly pt-6">
    <div class="my-2">
      <span
        class="mdi mdi-18px mdi-fruit-grapes mr-2 text-pink-400 dark:text-pink-500"
      ></span>
      <label for="amount" :class="labelClasses">How many questions?</label>
      <input
        type="number"
        id="amount"
        value="10"
        min="1"
        max="50"
        :class="inputClasses"
        @change="setAmount"
      />
    </div>

    <div class="my-2">
      <span
        class="mdi mdi-18px mdi-flask mr-2 text-pink-400 dark:text-pink-500"
      ></span>
      <label for="category" :class="labelClasses">Select Category:</label>
      <select id="category" :class="inputClasses" @change="setCategory">
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

    <div class="my-2">
      <span
        class="mdi mdi-18px mdi-french-fries mr-2 text-pink-400 dark:text-pink-500"
      ></span>
      <label for="difficulty" :class="labelClasses">Select Difficulty:</label>
      <select id="difficulty" :class="inputClasses" @change="setDifficulty">
        <option value="any">Any</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>

    <button
      class="mx-auto h-16 w-16 transform cursor-pointer rounded-full py-2 text-2xl font-semibold leading-5 transition hover:border-2 hover:border-pink-400 hover:text-pink-400 active:bg-pink-400 active:text-neutral-100 dark:hover:border-pink-500 dark:hover:text-pink-500 dark:active:bg-pink-500 dark:active:text-neutral-900"
      @click="getQuiz"
    >
      GO!
    </button>
  </div>
</template>
