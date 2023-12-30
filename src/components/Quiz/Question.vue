<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "@/stores/main";
import ChoiceButton from "./ChoiceButton.vue";
import Timer from "@/components/Timer.vue";
import gsap from "gsap";

const store = useStore();

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
});

const questionContainer = ref(null);
const choicesContainer = ref(null);
const activateTimer = ref(false);

const emit = defineEmits(["updateProgress"]);

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
  activateTimer.value = false;

  const choice = choices.value.at(index);
  if (choice.correct) store.scorePoint();

  emit("updateProgress");

  setTimeout(() => {
    tl.reverse();
  }, 500);

  setTimeout(() => {
    store.nextQuestion();
  }, 1000);
}

const tl = gsap.timeline({ duration: 0.5, ease: "expo.in", paused: true });

function buildTimeline() {
  tl.fromTo(
    questionContainer.value,
    { opacity: 0 },
    { opacity: 1 },
    "animateIn",
  ).fromTo(
    choicesContainer.value,
    { opacity: 0, y: 250 },
    { opacity: 1, y: 0 },
    "animateIn",
  );
}

const updateTitle = () => {
  document.title = `Question ${store.index + 1} / ${store.quizLength}`;
};

const updateQuestion = () => {
  tl.play("animateIn");
  updateTitle();
  activateTimer.value = true;
};

onMounted(() => {
  buildTimeline();
  updateQuestion();
});

watch(
  () => props.question,
  () => {
    updateQuestion();
  },
);
</script>

<template>
  <!-- question container -->
  <div ref="questionContainer" class="h-auto w-full px-6 pb-4">
    <div class="mx-auto mt-8 flex w-full justify-between lg:w-[95%]">
      <div>
        <span class="mdi mr-2" :class="difficultyIcon"></span>
        <small class="my-1.5 text-xs leading-none lg:text-sm">{{
          props.question.category
        }}</small>
      </div>

      <Timer :activate="activateTimer" @time-out="() => (store.index = null)" />
    </div>

    <p class="my-10 h-56 overflow-y-auto text-left text-3xl lg:text-4xl">
      {{ decodeHTML(props.question.question) }}
    </p>
  </div>

  <!-- choices container -->
  <div
    ref="choicesContainer"
    class="mt-auto grid w-full grid-cols-1 md:grid-cols-2"
  >
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
