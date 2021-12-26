<template>
    <div class="container mx-auto max-w-2xl lg:max-w-4xl min-h-screen md:h-screen p-5 flex">
        <div class="md:h-3/5 my-16 md:my-auto w-full bg-white dark:bg-gray-800 rounded-xl shadow-wrapper-shadow relative">
            <template v-if="!triviaLength">
                <QuizSelection />
            </template>
            <template v-if="(question)">
                <Question />
            </template>
            <template v-if="(index >= triviaLength && triviaLength != 0)">
                <FinalScore />
            </template>
        </div>
    </div>
</template>

<script>

import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import QuizSelection from '@/components/QuizSelection.vue'
import Question from '@/components/Question.vue'
import FinalScore from '@/components/FinalScore.vue'

export default {
    name: 'App',
    components: {
        QuizSelection,
        Question,
        FinalScore
    },
    setup() {
        const store = useStore()
        
        const index = computed(() => {
            return store.state.index
        })

        const triviaLength = computed(() => {
            return store.getters.triviaLength
        })

        const question = computed(() => {
            return store.getters.currentQuestion
        })

        onMounted(() => {
            store.dispatch('getCategories')
        })

        return {
            index,
            triviaLength,
            question
        }
    }
}
</script>

<style>
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>