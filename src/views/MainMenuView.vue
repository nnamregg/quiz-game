<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "@/stores/main";
import { gsap } from "gsap";
import FormControl from "@/components/MainMenu/FormControl.vue";
import RangeInput from "@/components/MainMenu/RangeInput.vue";
import Dialog from "@/components/MainMenu/Dialog.vue";
import Button from "@/components/Button.vue";
import OptionsGrid from "@/components/MainMenu/OptionsGrid.vue";

const store = useStore();

const showCategoriesModal = ref(false);
const goBtnRef = ref(null);

const hasError = computed(() => (store.fetchError ? true : false));

const toggleCategoriesModal = () => {
  showCategoriesModal.value = !showCategoriesModal.value;
};

const currentCategoryId = computed(() => parseInt(store.quizOptions.category));

const currentCategory = computed(() => {
  const category = store.categories.find(
    (c) => c.id === currentCategoryId.value,
  );
  return category?.name;
});

function setOption(e) {
  const [opt, val] = [e.target.name, e.target.value];
  store.setOption(opt, val);
}

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
    class="mx-auto flex w-full max-w-4xl flex-col items-center justify-between px-12 py-16 lg:py-12"
    @submit.prevent="getQuiz"
  >
    <FormControl
      ico="mdi-counter"
      :label="{
        name: 'amount',
        label: `Questions amount: ${store.quizOptions.amount}`,
      }"
    >
      <RangeInput
        :attributes="{
          name: 'amount',
          type: 'range',
          min: 1,
          max: 50,
        }"
        :set-option="setOption"
      />
    </FormControl>

    <FormControl
      ico="mdi-gauge"
      :label="{
        name: 'difficulty',
        label: 'Difficulty',
      }"
    >
      <OptionsGrid
        name="difficulty"
        :options="[
          { id: 'easy', name: 'Easy' },
          { id: 'medium', name: 'Medium' },
          { id: 'hard', name: 'Hard' },
        ]"
      />
    </FormControl>

    <FormControl
      ico="mdi-flask"
      :label="{
        name: 'category',
        label: 'Category',
      }"
    >
      <button
        class="mx-auto mt-1 w-full border-0 border-t-2 border-neutral-300 bg-transparent px-0 py-1 text-base font-semibold text-neutral-700 focus:border-pink-400 focus:text-pink-500 focus:shadow-md focus:shadow-pink-200/50 focus:ring-0 md:py-1.5 dark:border-neutral-900 dark:text-neutral-500 dark:focus:border-neutral-700 dark:focus:text-neutral-200 dark:focus:shadow-neutral-800/25"
        @click.prevent="toggleCategoriesModal"
      >
        {{ currentCategory || "Any" }}
      </button>
      <Teleport to="body">
        <Dialog
          :show="showCategoriesModal"
          @close-modal="() => (showCategoriesModal = false)"
        >
          <OptionsGrid name="category" :options="store.categories" />
        </Dialog>
      </Teleport>
    </FormControl>

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
