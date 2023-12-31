<script setup>
import { computed, ref } from "vue";
import { useStore } from "@/stores/main";
import Question from "@/components/Quiz/Question.vue";

const store = useStore();

const progressBar = ref(null);

const percentage = computed(() => ((store.index + 1) / store.quizLength) * 100);

const updateProgressBar = () => {
  progressBar.value.style.width = percentage.value + "%";
};

</script>

<template>
  <div class="flex h-auto w-full flex-col">
    <!-- progressBar container -->
    <div class="h-2 w-full bg-pink-100 dark:bg-neutral-800">
      <div
        ref="progressBar"
        class="h-2 w-0 bg-pink-400 p-0.5 text-center text-xs leading-none transition-all dark:bg-teal-500"
      ></div>
    </div>

    <Question :question="store.currentQuestion" @update-progress="updateProgressBar"/>
  </div>
</template>
