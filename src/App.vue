<template>
    <div class="min-h-screen md:h-screen">
        <div class="container min-h-screen md:h-full mx-auto max-w-2xl lg:max-w-4xl p-5 flex">

            <div class="h-auto md:h-3/5 mt-16 md:my-auto w-full bg-neutral-100 dark:bg-neutral-900 rounded-b-lg shadow-md relative hover:shadow-lg overflow-hidden">

                <QuizSelection v-if="store.quizLength === 0" />
                
                <Question v-else-if="(store.currentQuestion)" />
                
                <FinalScore v-if="(store.index >= store.quizLength && store.quizLength != 0)" />

            </div>

            <div class="absolute top-6 right-24 md:right-0 md:relative md:float-right md:h-3/5 md:my-auto">

                <DarkModeSelector />

            </div>

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
