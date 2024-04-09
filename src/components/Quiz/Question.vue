<script setup>
import { computed } from "vue";
import { useStore } from "@/stores/main";
import Timer from "@/components/Quiz/Timer.vue";

const store = useStore();

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  activateTimer: {
    type: Boolean,
    required: true,
  },
});

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
</script>

<template>
  <div class="mb-auto h-auto w-full px-6">
    <div class="mx-auto mt-8 flex w-full justify-between lg:w-[95%]">
      <div>
        <span class="mdi mr-2" :class="difficultyIcon"></span>
        <small class="my-1.5 text-xs leading-none lg:text-sm">{{
          props.question.category
        }}</small>
      </div>

      <Timer
        :activate="props.activateTimer"
        @time-out="() => (store.index = null)"
      />
    </div>

    <p class="my-10 min-h-40 overflow-y-auto text-left text-3xl lg:text-4xl">
      {{ props.question.question }}
    </p>
  </div>
</template>
