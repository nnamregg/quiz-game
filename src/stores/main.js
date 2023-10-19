import { defineStore } from "pinia";
import { computed, ref, reactive } from "vue";
import axios from "axios";

export const useStore = defineStore("main", () => {
  // State
  const categories = ref([]);
  const quizOptions = reactive({
    amount: 10,
    category: 0,
    difficulty: "any",
    type: "multiple"
  });
  const questions = ref([]);
  const index = ref(0);
  const score = ref(0);

  const timer = reactive({
    timeLimit: 10,
    timePassed: 0,
    counterOn: false,
  });

  // Getters
  const quizLength = computed(() => questions.value.length);
  const currentQuestion = computed(() => questions.value[index.value]);
  const timeLeft = computed(() => timer.timeLimit - timer.timePassed);

  // Actions
  function setQuizAmount(amount) {
    quizOptions.amount = amount;
  }

  function setQuizCategory(category) {
    quizOptions.category = category;
  }

  function setQuizDifficulty(difficulty) {
    quizOptions.difficulty = difficulty;
  }

  /*
  function resetOptions() {
    quizOptions.amount = 10
    quizOptions.category = 0
    quizOptions.difficulty = ""
  }
  */

  // Async Actions
  async function getCategories() {
    try {
      const response = await axios("https://opentdb.com/api_category.php");
      this.categories = response.data.trivia_categories;
    } catch (error) {
      alert(error);
    }
  }

  async function getTriviaQuestions() {
    const url = "https://opentdb.com/api.php";

    const params = {};

    Object.entries(quizOptions).forEach(([key, val]) => {
      if(val === 0 || val === "any") return;
      params[key] = val;
    })

    try {
      const response = await axios({ method: "post", url, params });
      this.questions = response.data.results;
    } catch (error) {
      console.error(error);
    }
  }

  return {
    categories,
    quizOptions,
    questions,
    index,
    score,
    timer,
    quizLength,
    timeLeft,
    currentQuestion,
    setQuizAmount,
    setQuizCategory,
    setQuizDifficulty,
    getCategories,
    getTriviaQuestions,
  };
});
