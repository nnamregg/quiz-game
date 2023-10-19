<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "@/stores/main";
import gsap from "gsap";

const store = useStore();

const BTN_CLASSES =
  "py-auto flex h-16 transform cursor-pointer items-center justify-center bg-neutral-200 px-1 text-sm font-semibold transition duration-75 hover:bg-neutral-200/25 active:bg-pink-300 dark:bg-neutral-800/10 dark:hover:bg-neutral-700/25 dark:active:bg-teal-400/75 md:h-20 lg:text-base";

const finalScore = computed(() => {
  const avg = (store.score / store.quizLength) * 100;
  return getFinalScore(avg);
});

const scores = {
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
  const { terrible, low, nice, excelent, perfect } = scores;

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
  setTimeout(() => {
    store.$patch({
      index: 0,
      score: 0,
      timer: {
        timePassed: 0,
        counterOn: false,
      },
    });
  }, 500);
};

const newQuiz = () => {
  setTimeout(() => {
    store.$patch({
      index: 0,
      score: 0,
      timer: {
        timePassed: 0,
        counterOn: false,
      },
      options: {
        amount: 10,
        category: 0,
        difficulty: "",
      },
      questions: [],
    });
  }, 500);
};

const scoreAnim = () => {
  gsap.fromTo(
    ".anim-top",
    { opacity: 0, y: -200 },
    { opacity: 1, y: 0, duration: 0.4, ease: "power4.in" },
  );
  gsap.fromTo(
    ".anim-center",
    { opacity: 0 },
    { opacity: 1, y: 0, delay: 0.6, duration: 1, ease: "power1.inOut" },
  );
  gsap.fromTo(
    ".anim-btn",
    { opacity: 0 },
    { opacity: 1, y: 0, delay: 1, duration: 0.8, ease: "linear" },
  );
};

const title = () => {
  if (store.index === 100) {
    document.title = "Out of time";
  } else {
    document.title = finalScore.value.text;
  }
};

onMounted(() => {
  title();
  scoreAnim();
});
</script>

<template>
  <div class="flex h-full w-full flex-col pt-16">
    <div class="relative my-12">
      <template v-if="store.index === store.quizLength">
        <div
          class="anim-top mx-auto w-fit items-center justify-between rounded border-2 border-pink-200 bg-pink-200/50 pb-1.5 text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-teal-300/75"
        >
          <span
            class="block bg-pink-200 pb-1 text-center text-sm font-semibold text-neutral-600 dark:bg-neutral-700 dark:text-neutral-900"
            >FINAL SCORE</span
          >
          <span
            class="rounded block mx-6 my-1.5 text-3xl font-bold"
            >{{ store.score }} / {{ store.quizLength }}</span
          >
        </div>

        <div class="anim-center mx-auto my-14 max-w-md">
          <span class="mdi text-8xl" :class="finalScore.ico"></span>
          <p class="mt-1 text-4xl lg:text-5xl">{{ finalScore.text }}</p>
        </div>
      </template>

      <template v-else-if="store.index === 100">
        <h1 class="anim-top mb-16 text-3xl uppercase text-red-500">
          You're out of time
        </h1>
        <span
          class="mdi mdi-timer-check-outline anim-center my-20 block text-9xl text-neutral-700 dark:text-neutral-300"
        ></span>
      </template>
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
