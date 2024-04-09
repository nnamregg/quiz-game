<script setup>
import { ref, onMounted } from "vue";
import DialogTransition from "./DialogTransition.vue";

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["closeModal"]);

const dialogRef = ref(null);

onMounted(() => {
  window.addEventListener("keyup", (e) => {
    if (e.key === "Escape") emit("closeModal");
  });
});
</script>

<template>
  <DialogTransition>
    <div
      v-if="show"
      ref="dialogRef"
      class="fixed left-0 top-0 z-50 h-full w-full overflow-y-scroll bg-neutral-800/50 px-4 py-12 backdrop-blur-md md:px-32 md:py-44 xl:px-96 xl:py-56"
      @click.self="emit('closeModal')"
    >
      <button
        autofocus
        class="absolute right-2 top-2"
        @click.prevent="emit('closeModal')"
      >
        <span class="mdi mdi-close-circle text-xl text-neutral-50"></span>
      </button>
      <slot></slot>
    </div>
  </DialogTransition>
</template>

<style scoped>
div::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
</style>
