<script setup>
import { computed, ref, watch } from "vue";
import { useStore } from "@/stores/main";
import QuestionTransition from "@/components/Quiz/QuestionTransition.vue";
import Question from "@/components/Quiz/Question.vue";
import ChoicesTransition from "@/components/Quiz/ChoicesTransition.vue";
import Choices from "@/components/Quiz/Choices.vue";

const store = useStore();

const progressBar = ref(null);
const activateTimer = ref(false);

const percentage = computed(() => ((store.index + 1) / store.quizLength) * 100);
const currentQuestion = computed(() => {
  return {
    ...store.currentQuestion,
    question: decodeHTML(store.currentQuestion.question),
    category: decodeHTML(store.currentQuestion.category),
  };
});
const questionKey = computed(() => `0${store.index}-question`);
const choicesKey = computed(() => `0${store.index}-choices`);

const updateProgressBar = () => {
  progressBar.value.style.width = percentage.value + "%";
};

const stopTimer = () => {
  activateTimer.value = false;
};

const startTimer = () => {
  activateTimer.value = true;
};

const decodeHTML = (str) => {
  let txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
};

const updateTitle = () => {
  document.title = `Question ${store.index + 1} / ${store.quizLength}`;
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const choices = computed(() => {
  const choicesList = [];

  currentQuestion.value.incorrect_answers.forEach((element) => {
    choicesList.push({
      value: decodeHTML(element),
      correct: false,
    });
  });

  choicesList.splice(getRandomInt(4), 0, {
    value: decodeHTML(currentQuestion.value.correct_answer),
    correct: true,
  });

  return choicesList;
});

watch(
  currentQuestion,
  () => {
    updateTitle();
    startTimer();
  },
  { immediate: true },
);
</script>

<template>
  <div class="flex h-auto w-full flex-col">
    <div class="h-2 w-full bg-pink-100 dark:bg-neutral-800">
      <div
        ref="progressBar"
        class="h-2 w-0 bg-pink-400 p-0.5 text-center text-xs leading-none transition-all dark:bg-teal-500"
      ></div>
    </div>

    <QuestionTransition>
      <Question
        :key="questionKey"
        :question="currentQuestion"
        :activate-timer="activateTimer"
      />
    </QuestionTransition>

    <ChoicesTransition>
      <Choices
        :key="choicesKey"
        :choices="choices"
        @stop-timer="stopTimer"
        @update-progress="updateProgressBar"
      />
    </ChoicesTransition>
  </div>
</template>
