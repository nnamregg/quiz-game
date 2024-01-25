<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useStore } from "@/stores/main";
import { gsap } from "gsap";

const store = useStore();

const props = defineProps({
  animateOut: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["setTitle"]);

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

const finalScore = computed(() => {
  const avg = (store.score / store.quizLength) * 100;
  return getFinalScore(avg);
});

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

const badgeRef = ref(null);
const iconRef = ref(null);
const textRef = ref(null);

const tl = gsap.timeline({ ease: "power1.Out" });

function buildTimeline() {
  tl.fromTo(
    badgeRef.value,
    { opacity: 0, translateY: -250 },
    {
      opacity: 1,
      translateY: 0,
      duration: 0.3,
    },
    "animateIn",
  )
    .fromTo(
      iconRef.value,
      { opacity: 0, scale: 0.1 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
      },
      "animateIn",
    )
    .fromTo(
      textRef.value,
      { opacity: 0, "clip-path": "polygon(0 0, 10% 0, 6% 100%, 0% 100%)" },
      {
        opacity: 1,
        "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.8,
      },
      "animateIn",
    );
}

onMounted(() => {
  emit("setTitle", finalScore.value.text);
  buildTimeline();
});

watch(
  () => props.animateOut,
  (newVal) => {
    if (newVal) tl.reverse();
  },
);
</script>

<template>
  <div
    ref="badgeRef"
    class="anim-top mx-auto w-fit items-center justify-between rounded border-2 border-pink-200 bg-pink-200/50 pb-1.5 text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-teal-300/75"
  >
    <span
      class="block bg-pink-200 pb-1 text-center text-sm font-semibold text-neutral-600 dark:bg-neutral-700 dark:text-neutral-900"
      >FINAL SCORE</span
    >
    <span class="mx-6 my-1.5 block rounded text-3xl font-bold"
      >{{ store.score }} / {{ store.quizLength }}</span
    >
  </div>

  <div class="mx-auto my-14 max-w-md">
    <span
      ref="iconRef"
      class="mdi block text-8xl"
      :class="finalScore.ico"
    ></span>
    <p ref="textRef" class="mt-1 text-4xl lg:text-5xl">
      {{ finalScore.text }}
    </p>
  </div>
</template>
