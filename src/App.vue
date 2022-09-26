<template>
    <div id="dark-mode-selector">
        <DarkModeSelector />
    </div>
    <div class="container mx-auto max-w-2xl lg:max-w-4xl min-h-screen md:h-screen p-5 flex">
        <div class="md:h-3/5 my-16 md:my-auto w-full bg-neutral-100 dark:bg-neutral-900 rounded-b-lg shadow-md relative hover:shadow-lg overflow-hidden">
            <QuizSelection v-if="store.quizLength === 0" />
            
            <Question v-else-if="(store.currentQuestion)" />
            
            <FinalScore v-if="(store.index >= store.quizLength && store.quizLength != 0)" />
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from '@/stores/main'
import DarkModeSelector from '@/components/DarkModeSelector.vue'
import QuizSelection from '@/components/QuizSelection.vue'
import Question from '@/components/Question.vue'
import FinalScore from '@/components/FinalScore.vue'

const store = useStore()

/* function setTheme() {
    if(localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
} */

/* 
// Elecciones de usuario
localStorage.theme = 'light'
localStorage.theme = 'dark'
localStorage.removeItem('theme')
 */

onMounted(() => {
    store.getCategories()
})

</script>

<style>

#dark-mode-selector {
    position: absolute;
    top: 5%;
    right: 5%;
}
</style>
