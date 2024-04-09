<script setup>
import { useStore } from "@/stores/main";
import ChoiceButton from "./ChoiceButton.vue";

const store = useStore();

const props = defineProps({
  choices: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["stopTimer", "updateProgress"]);

function handleAnswer(correct) {
  emit("stopTimer");
  emit("updateProgress");
  if (correct) store.scorePoint();

  setTimeout(() => {
    store.nextQuestion();
  }, 500);
}
</script>

<template>
  <div class="grid w-full grid-cols-1 md:grid-cols-2">
    <ChoiceButton
      v-for="(choice, index) in props.choices"
      :key="index"
      :correct="choice.correct"
      @handle-answer="handleAnswer(choice.correct)"
    >
      {{ choice.value }}
    </ChoiceButton>
  </div>
</template>
