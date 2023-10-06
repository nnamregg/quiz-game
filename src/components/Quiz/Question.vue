<script setup>
import { computed, onMounted, onUpdated, ref } from "vue";
import { useStore } from "@/stores/main";
import ChoiceButton from "./ChoiceButton.vue";
import Timer from "@/components/Timer.vue";
import gsap from "gsap";

const store = useStore();

const props = defineProps({
  question: {
    type: Object,
    required: true,
  }
})

const emit = defineEmits(['updateProgress'])

const difficultyIcon = computed(() =>
  setDifficultyIcon(props.question.difficulty),
);

function setDifficultyIcon(difficulty) {
  const icons = {
    easy: ["mdi-gauge-empty", "text-green-600", "dark:text-green-400"],
    medium: ["mdi-gauge", "text-amber-500", "dark:text-amber-400"],
    hard: ["mdi-gauge-full", "text-red-600", "dark:text-red-400"],
  };

  return icons[difficulty];
}

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const choices = computed(() => {
  const choicesList = [];

  props.question.incorrect_answers.forEach((element) => {
    choicesList.push({
      value: element,
      correct: false,
    });
  });

  choicesList.splice(getRandomInt(4), 0, {
    value: props.question.correct_answer,
    correct: true,
  });

  return choicesList;
});

const decodeHTML = (str) => {
  let txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
};

function handleAnswer(index) {
  store.timer.counterOn = false;

  const choice = choices.value.at(index);
  if (choice.correct) store.score++;
  
  emit("updateProgress")
  
  animOut();
  setTimeout(() => {
    store.index++;
  }, 1000);
}

const animIn = () => {
  gsap.fromTo(
    "#questionAnim",
    { opacity: 0 },
    { opacity: 1, delay: 0.3, duration: 0.2, ease: "expo.in" },
  );
  gsap.fromTo(
    "#choicesAnim",
    { opacity: 0, y: 250 },
    { opacity: 1, y: 0, delay: 0.3, duration: 0.5, ease: "expo.in" },
  );
};

const animOut = () => {
  gsap.to("#questionAnim", {
    opacity: 0,
    delay: .5,
    duration: .3,
    ease: "expo.out",
  });
  gsap.to("#choicesAnim", {
    opacity: 0,
    y: 250,
    delay: .5,
    duration: .3,
    ease: "expo.out",
  });
};

const updateTitle = () => {
  document.title = `Question ${store.index + 1} / ${store.quizLength}`;
};

const updateQuestion = () => {
  updateTitle();
  animIn();
  setTimeout(() => {
    store.timer.counterOn = true;
    store.timer.timePassed = 0;
  }, 500);
};

onMounted(() => {
  updateQuestion();
});

onUpdated(() => {
  updateQuestion();
});

</script>

<template>
  <!-- question container -->
  <div id="questionAnim" class="h-auto w-full px-6 pb-4">

    <div class="mx-auto mt-8 flex w-full justify-between lg:w-[95%]">
      
      <div>
        <span class="mdi mr-2" :class="difficultyIcon"></span>
        <small class="my-1.5 text-xs leading-none lg:text-sm">{{
          props.question.category
        }}</small>
      </div>
      
      <Timer />

    </div>

    <p class="my-10 text-left text-2xl md:text-3xl lg:text-5xl">
      {{ decodeHTML(props.question.question) }}
    </p>

  </div>

  <!-- choices container -->
  <div id="choicesAnim" class="mt-auto grid w-full grid-cols-1 md:grid-cols-2">
    <ChoiceButton
      v-for="(choice, index) in choices"
      :key="index"
      :correct="choice.correct"
      @handle-answer="handleAnswer(index)"
    >
      {{ decodeHTML(choice.value) }}
    </ChoiceButton>
  </div>
</template>
