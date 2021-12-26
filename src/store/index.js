import { createStore } from 'vuex'

export default createStore({
    state: {
        categories: [],
        options: {
            questions_amount: 10,
            quiz_category: 0,
            quiz_difficulty: ''            
        },
        triviaQuestions: [],
        index: 0,
        score: 0,
        timer: {
            time_limit: 10,
            time_passed: 0,
            counter_on: false
        }
    },
    mutations: {
        SET_CATEGORIES(state, payload) {
            state.categories = payload
        },
        SET_OPT_AMOUNT(state, payload) {
            state.options.questions_amount = payload
        },
        SET_QUIZ_CATEGORY(state, payload) {
            state.options.quiz_category = payload
        },
        SET_QUIZ_DIFFICULTY(state, payload) {
            state.options.quiz_difficulty = payload
        },
        SET_QUIZ(state, payload) {
            state.triviaQuestions = payload
        },
        SCORE_POINT(state) {
            state.score += 1 
        },
        NEXT_QUESTION(state) {
            state.index += 1
        },
        RESET(state) {
            state.index = 0
            state.score = 0
            state.options.questions_amount = 10,
            state.options.quiz_category = 0,
            state.options.quiz_difficulty = '',
            state.timer.time_passed = 0
        },
        COUNTER_CONTROL(state, payload) {
            state.timer.counter_on = payload
        },
        COUNTDOWN(state) {
            state.timer.time_passed++
        },
        COUNTDOWN_RESET(state) {
            state.timer.time_passed = 0
        },
        TIMES_OUT(state) {
            state.index = 100
        }
    },
    actions: {
       async getTriviaQuestions(context) {
            const options = context.state.options
            let apiURL = `https://opentdb.com/api.php?amount=${options.questions_amount}&type=multiple`
            
            if (options.quiz_category>0) {
                apiURL = apiURL.concat(`&category=${options.quiz_category}`)
            }

            if (options.quiz_difficulty.length) {
                apiURL = apiURL.concat(`&difficulty=${options.quiz_difficulty}`)
            }

            try {
                const response = await fetch(apiURL)
                const data = await response.json()
                context.commit('SET_QUIZ', data.results)
            } catch(error) {
                console.error(error)
            }
        },
        async getCategories({commit}) {
            try {
                const response = await fetch('https://opentdb.com/api_category.php')
                const data = await response.json()
                commit('SET_CATEGORIES', data.trivia_categories)
            } catch(error) {
                console.log(error)
            }
        }
    },
    getters: {
        triviaLength: state => {
            return state.triviaQuestions.length
        },
        timeLeft: state => {
            return state.timer.time_limit - state.timer.time_passed
        },
        currentQuestion: state => {
            return state.triviaQuestions[state.index]
        }
    }
})