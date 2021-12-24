<template>
    <div class="max-w-xl mx-auto pt-6 font-sans h-full flex flex-col justify-evenly overflow-hidden">

        <div class="my-2">
            <label for="amount" class="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-400">How many questions?</label>
            <input
            type="number"
            id="amount"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block mx-auto w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
            value="10"
            min="1"
            max="50"
            @change="setQuestionsAmount">
        </div>

        <div class="my-2">
            <label for="category" class="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-400">Select Category:</label>
            <select
            id="category"
            class="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block mx-auto w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-teal-500 dark:focus:border-teal-500"
            @change="setQuizCategory">
                <option value="0">Any</option>
                <option v-for="(cat, index) in categories" :value="cat.id" :key="index">{{ cat.name }}</option>
            </select>
        </div>

        <div class="my-2">
            <label for="difficulty" class="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-400">Select Difficulty:</label>
            <select
            id="difficulty"
            class="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block mx-auto w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-teal-500 dark:focus:border-teal-500"
            @change="setQuizDifficulty">
                <option value="any">Any</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
        </div>

        <div class="">
            <button class="btn focus:dark:bg-teal-400 focus:text-gray-800 focus:scale-105 focus:ring-2 focus:ring-teal-600 leading-5 py-2 w-1/3 mx-auto cursor-pointer transition transform" @click="getQuiz">GO!</button>
        </div>

    </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
    setup() {
        const store = useStore()

        const categories = computed(() => {
            return store.state.categories
        })

        // Seteo de opciones
        const setQuestionsAmount = ((event) => {
            store.commit('SET_OPT_AMOUNT', parseInt(event.target.value))
        })

        const setQuizCategory = ((event) => {
            store.commit('SET_QUIZ_CATEGORY', parseInt(event.target.value))
        })

        const setQuizDifficulty = ((event) => {
            store.commit('SET_QUIZ_DIFFICULTY', event.target.value)
        })

        const getQuiz = (event) => {
            let el = event.target
            el.classList.add('scale-105')
            setTimeout(() => {
                store.dispatch('getTriviaQuestions')}, 300)
        }

        onMounted(() => {
            document.title = 'Select Your Quiz'
        })

        return {
            categories,
            setQuestionsAmount,
            setQuizCategory,
            setQuizDifficulty,
            getQuiz
        }
    }
}
</script>

<style>

</style>