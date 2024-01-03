<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "@/stores/main";
import { gsap } from "gsap";
import { twMerge as twm } from "tailwind-merge";

const store = useStore();

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  ico: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  setOption: {
    type: Function,
    required: true,
  },
  options: {
    type: Array,
    required: false,
  },
  attributes: {
    type: Object,
    default: {},
  },
});

const ICO_BG_CLASSES =
  "mr-3 mt-2 flex h-9 w-9 shrink-0 items-center rounded-full bg-pink-400 dark:bg-teal-600 form-icon";

const BASE_ICO_CLASSES =
  "mdi mdi-counter m-auto text-xl text-neutral-100 dark:text-neutral-900";

const LABEL_CLASSES =
  "block w-full border-pink-300/75 text-left text-sm font-semibold text-neutral-500/75 dark:border-teal-300/75 dark:text-neutral-200";

const INPUT_CLASSES =
  "mx-auto mt-1 w-full border-0 border-t-2 border-neutral-300 bg-transparent px-0 py-1 text-base font-semibold text-neutral-700 focus:border-pink-400 focus:text-pink-500 focus:shadow-md focus:shadow-pink-200/50 focus:ring-0 dark:border-neutral-900 dark:text-neutral-500 dark:focus:border-neutral-700 dark:focus:text-neutral-200 dark:focus:shadow-neutral-800/25 md:py-1.5";

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
  <div class="my-10 flex w-4/5 max-w-sm border-none bg-transparent md:my-8">
    <div ref="icoRef" :class="twm(ICO_BG_CLASSES)">
      <span :class="twm(BASE_ICO_CLASSES, ico)"></span>
    </div>
    <div ref="formControlRef" class="h-auto w-full">
      <label :for="name" :class="twm(LABEL_CLASSES)">{{ label }}</label>

      <select
        v-if="options"
        :id="name"
        :class="twm(INPUT_CLASSES)"
        :value="store.quizOptions[name]"
        @change="setOption"
      >
        <option value="0">Any</option>
        <option
          v-for="(option, index) in options"
          :value="option.id"
          :key="index"
        >
          {{ option.name }}
        </option>
      </select>

      <input
        v-else
        v-bind="attributes"
        :id="name"
        :class="twm(INPUT_CLASSES)"
        :value="store.quizOptions[name]"
        @change="setOption"
      />
    </div>
  </div>
</template>
