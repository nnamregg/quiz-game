<template>
    <div class="container mx-auto max-w-2xl lg:max-w-4xl min-h-screen md:h-screen p-5 flex">
        <div class="md:h-3/5 my-16 md:my-auto w-full bg-white dark:bg-gray-800 rounded-xl shadow-wrapper-shadow relative">
            <QuizSelection v-if="store.quizLength === 0" />
            
            <Question v-else-if="(store.currentQuestion)" />
            
            <FinalScore v-if="(store.index >= store.quizLength && store.quizLength != 0)" />
        </div>
    </div>
</template>

<script setup>

import { onMounted } from 'vue'
import { useStore } from '@/stores/main'
import QuizSelection from '@/components/QuizSelection.vue'
import Question from '@/components/Question.vue'
import FinalScore from '@/components/FinalScore.vue'

const store = useStore()

onMounted(() => {
    store.getCategories()
})

</script>

<style>
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
