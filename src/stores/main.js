import { defineStore } from "pinia";
import { computed, ref, reactive } from "vue";
import axios from "axios";

export const useStore = defineStore("main", () => {
  // State
  const categories = ref([]);
  const quizOptions = reactive({
    amount: "10",
    category: "0",
    difficulty: "0",
    type: "multiple",
  });
  const questions = ref([]);
  const index = ref(0);
  const score = ref(0);
  const fetchError = ref(null)

  // Getters
  const quizLength = computed(() => questions.value.length);
  const currentQuestion = computed(() => questions.value[index.value]);

  // Actions
  function setOption(opt, val) {
    quizOptions[opt] = val;
  }

  function scorePoint() {
    score.value++
  }

  function nextQuestion() {
    index.value++;
  }

  function restartQuiz() {
    index.value = 0;
    score.value = 0;
  }

  function clearQuiz() {
    questions.value = [];
    restartQuiz();
  }

  function setFetchError(err) {
    const error = {
      code: err.code,
      name: err.name,
      message: err.message,
    };

    fetchError.value = error;
  }

  function clearFetchError() {
    if(!fetchError.value) return;
    fetchError.value = null;
  };

  // Async Actions
  async function getCategories() {
    try {
      const response = await axios("https://opentdb.com/api_category.php");
      this.categories = response.data.trivia_categories;
      clearFetchError();
    } catch (err) {
      setFetchError(err);
    }
  }

  async function getTriviaQuestions() {
    const url = "https://opentdb.com/api.php";

    const params = {};

    Object.entries(quizOptions).forEach(([key, val]) => {
      if (val === "0") return;
      params[key] = val;
    });

    try {
      const response = await axios({ method: "post", url, params });
      this.questions = response.data.results;
      clearFetchError();
    } catch (err) {
      setFetchError(err);
    }
  }

  return {
    categories,
    quizOptions,
    questions,
    index,
    score,
    fetchError,
    quizLength,
    currentQuestion,
    clearFetchError,
    setOption,
    scorePoint,
    nextQuestion,
    restartQuiz,
    clearQuiz,
    getCategories,
    getTriviaQuestions,
  };
});
