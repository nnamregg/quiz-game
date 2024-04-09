<script setup>
import { computed } from "vue";
import { useStore } from "@/stores/main";
import { twMerge as twm } from "tailwind-merge";
import RadioInput from "./RadioInput.vue";

const store = useStore();

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
});

const optionsAmount = computed(() => props.options.length);
const currentSelection = computed(() => store.quizOptions[props.name]);

const RADIO_CONTAINER_CLASSES =
  "relative flex h-auto w-full items-center overflow-hidden bg-pink-200 dark:bg-teal-800";

const isFullSpan = computed(
  () => optionsAmount.value >= 4 && optionsAmount.value % 4 === 0,
);
</script>

<template>
  <div
    :class="
      twm(
        'grid h-full w-full gap-[1px] overflow-hidden rounded-md border-2 border-pink-300 bg-pink-300 dark:border-teal-700 dark:bg-teal-700',
        isFullSpan ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-4',
      )
    "
  >
    <div :class="twm(RADIO_CONTAINER_CLASSES, isFullSpan && 'col-span-full')">
      <RadioInput
        :name="name"
        :option="{ id: '0', name: 'Any' }"
        :key="`${name}-radio-any`"
        :checked="currentSelection === '0'"
      />
    </div>

    <div
      v-for="(option, index) in props.options"
      :class="RADIO_CONTAINER_CLASSES"
    >
      <RadioInput
        :name="name"
        :option="option"
        :key="`${name}-radio-${index}-${option.name}`"
        :checked="currentSelection === option.id.toString()"
      />
    </div>
  </div>
</template>
