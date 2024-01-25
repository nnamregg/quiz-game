<script setup>
import { twMerge as twm } from "tailwind-merge";

const props = defineProps({
  class: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    default: "submit",
  },
  disabled: {
    type: Boolean,
    required: false,
  },
});

const emit = defineEmits(["action"]);

const BTN_CLASSES =
  "py-auto flex h-16 w-full transform cursor-pointer items-center justify-center bg-neutral-200 px-1 text-sm font-semibold transition duration-75  md:h-20 lg:text-base dark:bg-neutral-800/10";

const BTN_ENABLED_CLASSES =
  "hover:bg-neutral-200/25 active:bg-pink-300 dark:hover:bg-neutral-700/25 dark:active:bg-teal-400/75";
const BTN_DISABLED_CLASSES = "!cursor-not-allowed";

function onClick() {
  emit("action");
}
</script>

<template>
  <button
    :class="
      twm(
        BTN_CLASSES,
        props.disabled ? BTN_DISABLED_CLASSES : BTN_ENABLED_CLASSES,
        props.class,
      )
    "
    :type="props.type"
    :disabled="props.disabled"
    @click="onClick"
  >
    <slot> </slot>
  </button>
</template>
