import { defineStore } from "pinia";
import { computed, ref, reactive } from "vue";
import axios from "axios";

export const useStore = defineStore("main", () => {
  // State
  const categories = ref([]);
  const quizOptions = reactive({
    amount: 10,
    category: 0,
    difficulty: "",
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
  const timeLeft = computed(() => timer.timeLimit - timer.timePassed);
  const currentQuestion = computed(() => questions.value[index.value]);

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

    const params = {
      amount: quizOptions.amount,
      category: quizOptions.category,
      difficulty: quizOptions.difficulty,
      type: "multiple",
    };

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
