<template>
    <div class="container mx-auto max-w-2xl h-screen p-5 flex">
        <div class="h-4/6 my-auto w-full bg-white dark:bg-gray-800 shadow-wrapper-shadow">
            <template v-if="!triviaLength">
                <QuizSelection />
            </template>
            <template v-if="(index < triviaLength)">
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

        onMounted(() => {
            store.dispatch('getCategories')
        })

        return {
            index,
            triviaLength
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