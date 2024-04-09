<script setup>
import { useStore } from "@/stores/main";

const store = useStore();

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  option: {
    type: Object,
    required: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
});

function setOption(e) {
  const [opt, val] = [e.target.name, e.target.value];
  store.setOption(opt, val);
}
</script>

<template>
  <input
    :name="name"
    :id="`${name}-${option.id}`"
    :value="option.id"
    type="radio"
    @change="setOption"
    class="peer absolute box-content h-full w-full cursor-pointer rounded-none !border-none bg-transparent checked:bg-pink-400 checked:bg-none hover:!bg-pink-300 focus:!bg-pink-400 focus:outline-none focus:ring-0 dark:checked:bg-teal-500 dark:hover:!bg-teal-400 dark:focus:!bg-teal-500"
    :checked="checked"
  />
  <label
    :for="`${name}-${option.id}`"
    class="z-50 mx-auto my-2 cursor-pointer px-1.5 text-xs font-semibold uppercase text-neutral-500 underline-offset-2 peer-checked:font-bold peer-checked:text-neutral-50 peer-hover:text-neutral-100 peer-focus:underline dark:text-neutral-400"
    >{{ option.name }}</label
  >
</template>
