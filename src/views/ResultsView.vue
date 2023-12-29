<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "@/stores/main";
import gsap from "gsap";
import TimedOut from "@/components/Results/TimedOut.vue";
import FinalScore from "@/components/Results/FinalScore.vue";

const store = useStore();

const props = defineProps({
  isTimedOut: {
    type: Boolean,
    required: true,
  },
});

const BTN_CLASSES =
  "py-auto flex h-16 transform cursor-pointer items-center justify-center bg-neutral-200 px-1 text-sm font-semibold transition duration-75 hover:bg-neutral-200/25 active:bg-pink-300 dark:bg-neutral-800/10 dark:hover:bg-neutral-700/25 dark:active:bg-teal-400/75 md:h-20 lg:text-base";

const finalScore = computed(() => {
  const avg = (store.score / store.quizLength) * 100;
  return getFinalScore(avg);
});

const SCORES = {
  terrible: {
    threshold: 20,
    text: "Terrible",
    ico: "mdi-emoticon-poop",
  },
  low: {
    threshold: 50,
    text: "Low",
    ico: "mdi-emoticon-sad-outline",
  },
  nice: {
    threshold: 74,
    text: "Nice",
    ico: "mdi-emoticon-outline",
  },
  excelent: {
    threshold: 99,
    text: "Excelent",
    ico: "mdi-emoticon-excited-outline",
  },
  perfect: {
    threshold: 100,
    text: "Perfect!",
    ico: "mdi-emoticon-devil-outline",
  },
};

function getFinalScore(avg) {
  const { terrible, low, nice, excelent, perfect } = SCORES;

  if (avg < terrible.threshold) {
    return terrible;
  } else if (avg <= low.threshold) {
    return low;
  } else if (avg <= nice.threshold) {
    return nice;
  } else if (avg <= excelent.threshold) {
    return excelent;
  } else {
    return perfect;
  }
}

const resetQuiz = () => {
  tl.play("animateOut");
  setTimeout(() => {
    store.restartQuiz();
  }, 800);
};

const newQuiz = () => {
  tl.play("animateOut");
  setTimeout(() => {
    store.clearQuiz();
  }, 800);
};

const tl = gsap.timeline({ paused: true });

function buildTimeline() {
  tl.fromTo(
    ".anim-btn",
    { opacity: 0, y: 250 },
    { opacity: 1, y: 0, delay: 0.5, duration: 0.5, ease: "linear" },
    "animateIn",
  )
    .addPause()
    .to(
      "#resultsContainer",
      { opacity: 0, scale: 1.5, duration: 0.4, ease: "power4.out" },
      "animateOut",
    );
}

const setTitle = () => {
  document.title = props.isTimedOut ? "Out of time" : finalScore.value.text;
};

onMounted(() => {
  setTitle();
  buildTimeline();
  tl.play("animateIn");
});
</script>

<template>
  <div id="resultsContainer" class="flex h-full w-full flex-col pt-16">
    <div class="relative my-12">
      <TimedOut v-if="props.isTimedOut" />
      <FinalScore
        v-else
        :ico="finalScore.ico"
        :txt="finalScore.text"
        :score="[store.score, store.quizLength]"
      />
    </div>
    <div class="anim-btn grid w-full grid-cols-1 md:grid-cols-2">
      <button :class="BTN_CLASSES" @click="resetQuiz">
        <span class="mdi mdi-restart mdi-18px mr-2 mt-1"></span>Restart
      </button>
      <button :class="BTN_CLASSES" @click="newQuiz">
        <span class="mdi mdi-restart-alert mdi-18px mr-2 mt-1"></span>New Quiz
      </button>
    </div>
  </div>
</template>
