<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { twMerge as twm } from "tailwind-merge";
import Label from "@/components/MainMenu/Label.vue";

const props = defineProps({
  ico: {
    type: String,
    required: true,
  },
  label: {
    type: Object,
    required: true,
  },
});

const ICO_BG_CLASSES =
  "mr-3 flex h-7 w-7 md:h-9 md:w-9 shrink-0 items-center rounded-full bg-pink-400 dark:bg-teal-600";

const BASE_ICO_CLASSES =
  "mdi mdi-counter m-auto text-base md:text-xl text-neutral-100 dark:text-neutral-900";

const icoRef = ref(null);
const formControlRef = ref(null);

const tl = gsap.timeline({ ease: "power2.inOut", delay: 0.2, duration: 0.3 });

function buildTimeline() {
  tl.fromTo(
    icoRef.value,
    {
      scale: 0,
      rotation: 360,
    },
    {
      scale: 1,
      rotation: 0,
    },
  ).fromTo(
    formControlRef.value,
    {
      opacity: 0,
      "clip-path": "polygon(0 0, 10% 0, 6% 100%, 0% 100%)",
    },
    {
      opacity: 1,
      "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    },
  );
}
onMounted(() => buildTimeline());
</script>

<template>
  <fieldset class="w-full max-w-sm border-none bg-transparent">
    <div class="mb-3 flex w-full items-center">
      <div ref="icoRef" :class="twm(ICO_BG_CLASSES)">
        <span :class="twm(BASE_ICO_CLASSES, ico)"></span>
      </div>
      <Label v-bind="label" />
    </div>
    <div ref="formControlRef" class="h-auto w-full">
      <slot></slot>
    </div>
  </fieldset>
</template>
