<script setup>
import { onMounted, ref } from "vue";
import { gsap } from "gsap";

const timedOutHeading = ref(null);
const timedOutIcon = ref(null);

const tl = gsap.timeline({ paused: true });

function buildTimeline() {
  tl.fromTo(
    timedOutHeading.value,
    { opacity: 0, "clip-path": "polygon(0 0, 10% 0, 6% 100%, 0% 100%)" },
    {
      opacity: 1,
      "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      delay: 0.2,
      duration: 0.5,
    },
    "animateIn",
  ).fromTo(
    timedOutIcon.value,
    { opacity: 0, rotate: -1080, scale: 0.1 },
    {
      opacity: 1,
      rotate: 0,
      scale: 1,
      delay: 0.2,
      duration: 0.8,
      ease: "power1.inOut",
    },
    "animateIn",
  );
}

onMounted(() => {
  buildTimeline();
  tl.play("animateIn");
});

</script>

<template>
  <h1 ref="timedOutHeading" class="mb-16 text-3xl uppercase text-red-500">
    You're out of time
  </h1>
  <span
    ref="timedOutIcon"
    class="mdi mdi-timer-check-outline my-20 block text-9xl text-neutral-700 dark:text-neutral-300"
  ></span>
</template>
