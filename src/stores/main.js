import { defineStore } from 'pinia'
import { computed, ref, reactive } from 'vue'

export const useStore = defineStore('main', () => {
    // State
    const categories = ref([])
    const quizOptions = reactive({
        amount: 10,
        category: 0,
        difficulty: ''            
    })
    const questions = ref([])
    const index = ref(0)
    const score = ref(0)
    
    const timer = reactive({
        timeLimit: 10,
        timePassed: 0,
        counterOn: false
    })

    // Getters
    const quizLength = computed(() => questions.value.length )
    const timeLeft = computed(() => timer.timeLimit - timer.timePassed )
    const currentQuestion = computed(() => questions.value[index.value] )

    // Actions    
    function setQuizAmount(amount) {
        quizOptions.amount = amount
    }

    function setQuizCategory(category) {
        quizOptions.category = category
    }

    function setQuizDifficulty(difficulty) {
        quizOptions.difficulty = difficulty
    }

    // Async Actions
    async function getCategories() {
        try {
            const response = await fetch('https://opentdb.com/api_category.php')
            const data = await response.json()
            this.categories = data.trivia_categories
        } catch(error) {
            console.log(error)
        }
    }

    async function getTriviaQuestions() {
        const params = new URLSearchParams({
            amount: quizOptions.amount,
            category: quizOptions.category,
            difficulty: quizOptions.difficulty
        })
        const apiURL = `https://opentdb.com/api.php?${params}&type=multiple`

        try {
            const response = await fetch(apiURL)
            const data = await response.json()
            this.questions = data.results
        } catch(error) {
            console.error(error)
        }
    }

    return { categories, quizOptions, questions, index, score, timer, quizLength, timeLeft, currentQuestion, setQuizAmount, setQuizCategory, setQuizDifficulty, getCategories, getTriviaQuestions }

})

