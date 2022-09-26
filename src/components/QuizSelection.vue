<template>
    <div class="max-w-xl mx-auto pt-6 h-full flex flex-col justify-evenly overflow-hidden">
        <div class="my-2">
            <span class="mdi mdi-18px mdi-fruit-grapes mr-2 text-pink-400 dark:text-pink-500"></span>
            <label for="amount" :class="labelClasses">How many questions?</label>
            <input
            type="number"
            id="amount"
            value="10"
            min="1"
            max="50"
            :class="inputClasses"
            @change="setAmount">
        </div>

        <div class="my-2">
            <span class="mdi mdi-18px mdi-flask mr-2 text-pink-400 dark:text-pink-500"></span>
            <label for="category" :class="labelClasses">Select Category:</label>
            <select
            id="category"
            :class="inputClasses"
            @change="setCategory">
                <option value="0">Any</option>
                <option v-for="(cat, index) in store.categories" :value="cat.id" :key="index">{{ cat.name }}</option>
            </select>
        </div>

        <div class="my-2">
            <span class="mdi mdi-18px mdi-french-fries mr-2 text-pink-400 dark:text-pink-500"></span>
            <label for="difficulty" :class="labelClasses">Select Difficulty:</label>
            <select
            id="difficulty"
            :class="inputClasses"
            @change="setDifficulty">
                <option value="any">Any</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
        </div>

        <div class="">
            <button class="text-2xl font-semibold w-16 h-16 rounded-full leading-5 py-2 mx-auto cursor-pointer transition transform hover:border-2 hover:text-pink-400 hover:border-pink-400 active:bg-pink-400  dark:hover:text-pink-500 dark:hover:border-pink-500 dark:active:bg-pink-500 active:text-neutral-100 dark:active:text-neutral-900" @click="getQuiz">GO!</button>
        </div>

    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from '@/stores/main'

const store = useStore()

const labelClasses = 'block mb-2 text-sm lg:text-base font-semibold italic text-neutral-800 dark:text-neutral-200 inline'
const inputClasses = 'block border-0 border-b-2 text-lg mx-auto w-2/3 md:w-1/2 p-2 md:p-2.5 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 focus:shadow-lg focus:border-pink-500 focus:text-pink-500 focus:ring-0'

// Seteo de opciones para el fetch
const setAmount = ((e) => {
    store.setQuizAmount(parseInt(e.target.value))
})

const setCategory = ((e) => {
    store.setQuizCategory(parseInt(e.target.value))
})

const setDifficulty = ((e) => {
    store.setQuizDifficulty(e.target.value)
})

// Traeme las pregus
const getQuiz = (e) => {
    let el = e.target
    // el.classList.add('scale-105')
    setTimeout(() => {
        store.getTriviaQuestions()
    }, 200)
}

onMounted(() => {
    document.title = 'Select Your Quiz'
})
        
</script>
