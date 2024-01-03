<script setup>
import { onMounted, ref, watch } from "vue";
import { gsap } from "gsap";

const props = defineProps({
  animateOut: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["setTitle"]);

const headingRef = ref(null);
const iconRef = ref(null);

const HEADING = "You've wasted your precious time!";

const tl = gsap.timeline({ ease: "power1.inOut", duration: 0.5 });

function buildTimeline() {
  tl.fromTo(
    headingRef.value,
    { opacity: 0, "clip-path": "polygon(0 0, 10% 0, 6% 100%, 0% 100%)" },
    {
      opacity: 1,
      "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    },
    "animateIn",
  ).fromTo(
    iconRef.value,
    { opacity: 0, rotate: -1080, scale: 0.1 },
    {
      opacity: 1,
      rotate: 0,
      scale: 1,
    },
    "animateIn",
  );
}

onMounted(() => {
  emit("setTitle", HEADING);
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
  <h1 ref="headingRef" class="mb-16 text-3xl uppercase text-red-500">
    {{ HEADING }}
  </h1>
  <span
    ref="iconRef"
    class="mdi mdi-timer-check-outline my-20 block text-9xl text-neutral-700 dark:text-neutral-300"
  ></span>
</template>
