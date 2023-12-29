<script setup>
import { onMounted, ref } from "vue";
import { gsap } from "gsap";

const props = defineProps({
  ico: {
    type: String,
    required: true
  },
  txt: {
    type: String,
    required: true
  },
  score: {
    type: Array,
    required: true
  },
})

const scoreContainer = ref(null);
const scoreIcon = ref(null);
const scoreText = ref(null);

const tl = gsap.timeline({ paused: true });

function buildTimeline() {
  tl.fromTo(
    scoreContainer.value,
    { opacity: 0, y: -250 },
    {
      opacity: 1,
      y: 0,
      duration: 0.2,
      ease: "power1.inOut"
    },
    "animateIn",
  ).fromTo(
    scoreIcon.value,
    { opacity: 0, rotate: 1080, scale: 0.1 },
    {
      opacity: 1,
      rotate: 0,
      scale: 1,
      delay: 0.2,
      duration: 0.8,
      ease: "power1.inOut",
    },
    "animateIn",
  ).fromTo(
    scoreText.value,
    { opacity: 0, "clip-path": "polygon(0 0, 10% 0, 6% 100%, 0% 100%)" },
    {
      opacity: 1,
      "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0.5,
    },
  )
}

onMounted(() => {
  buildTimeline();
  tl.play("animateIn");
});

</script>

<template>
  <div
    ref="scoreContainer"
    class="anim-top mx-auto w-fit items-center justify-between rounded border-2 border-pink-200 bg-pink-200/50 pb-1.5 text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-teal-300/75"
  >
    <span
      class="block bg-pink-200 pb-1 text-center text-sm font-semibold text-neutral-600 dark:bg-neutral-700 dark:text-neutral-900"
      >FINAL SCORE</span
    >
    <span class="mx-6 my-1.5 block rounded text-3xl font-bold"
      >{{ props.score[0] }} / {{ props.score[1] }}</span
    >
  </div>

  <div class="mx-auto my-14 max-w-md">
    <span ref="scoreIcon" class="mdi text-8xl block" :class="props.ico"></span>
    <p ref="scoreText" class="mt-1 text-4xl lg:text-5xl">{{ props.txt }}</p>
  </div>
</template>
