<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "@/stores/main";
import { gsap } from "gsap";
import FormControl from "@/components/MainMenu/FormControl.vue";
import Button from "@/components/Button.vue";

const store = useStore();

const goBtnRef = ref(null);

const hasError = computed(() => (store.fetchError ? true : false));

const setAmount = (e) => {
  store.setQuizAmount(parseInt(e.target.value));
};

const setCategory = (e) => {
  store.setQuizCategory(parseInt(e.target.value));
};

const setDifficulty = (e) => {
  const { value } = e.target;
  if (value === "0") {
    store.setQuizDifficulty(parseInt(value));
  } else {
    store.setQuizDifficulty(value);
  }
};

const isDisabled = ref(false);

const getQuiz = () => {
  isDisabled.value = true;
  store.getTriviaQuestions();
};

const tl = gsap.timeline({
  delay: 0.5,
  duration: 0.5,
  ease: "elastic.out(1,0.3)",
});

function buildTimeline() {
  tl.fromTo(
    goBtnRef.value,
    { opacity: 0, translateY: 400 },
    { opacity: 1, translateY: 0 },
  );
}

onMounted(() => {
  buildTimeline();
  document.title = "Select Your Quiz";
  store.getCategories();
});

watch(hasError, (newVal) => {
  if (newVal) {
    isDisabled.value = true;
  } else {
    isDisabled.value = false;
  }
});
</script>

<template>
  <form
    class="mx-auto flex w-full max-w-4xl flex-col justify-center pt-10 md:pb-8"
    @submit.prevent="getQuiz"
  >
    <div class="mb-16 flex h-auto flex-col items-center md:mb-8">
      <FormControl
        name="amount"
        ico="mdi-counter"
        label="Questions amount"
        :attributes="{
          type: 'number',
          min: 1,
          max: 50,
        }"
        :set-option="setAmount"
      />

      <FormControl
        name="category"
        ico="mdi-flask"
        label="Category"
        :options="store.categories"
        :set-option="setCategory"
      />

      <FormControl
        name="difficulty"
        ico="mdi-flask"
        label="Difficulty"
        :options="[
          { id: 'easy', name: 'Easy' },
          { id: 'medium', name: 'Medium' },
          { id: 'hard', name: 'Hard' },
        ]"
        :set-option="setDifficulty"
      />
    </div>

    <div class="mx-auto w-full md:w-1/2" ref="goBtnRef">
      <Button
        class="p-9 text-2xl hover:shadow-sm md:rounded lg:text-3xl"
        type="submit"
        :disabled="isDisabled"
      >
        <span class="mdi mdi-play-circle"></span>
        GO!
      </Button>
    </div>
  </form>
</template>
