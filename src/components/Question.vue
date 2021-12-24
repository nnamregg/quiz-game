<template>

    <div class="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
        <div id="progress-bar" class="bg-gray-600 text-xs text-center p-0.5 leading-none w-0 h-4 rounded-full dark:bg-teal-500 transition-all duration-500"></div>
    </div>
   
    <div id="questionAnim" class="max-w-xl mx-auto h-full py-2 px-6 relative font-sans flex flex-col justify-between">
        <div class="relative mt-2">
            <div class="float-left text-left">
                <small class="text-xs leading-none">{{ question.category }}</small>
                <br>
                <small class="text-xs leading-none">{{ question.difficulty.toUpperCase() }}</small>
            </div>
            <div class="float-right text-right">
                <Timer />
            </div>
        </div>
        <h2 class="text-4xl text-left my-10">{{ decodeHTML(question.question) }}</h2>
        <div class="grid grid-cols-2 gap-6 my-12">

            <button class="dark:bg-gray-700 dark:border-gray-200 hover:bg-gray-600 border-2 rounded-lg h-16 text-sm py-auto cursor-pointer transition transform duration-75" 
            v-for="(option, index) in options" :key="index"
            @click="handleOption"
            >
                {{ decodeHTML(option) }}
            </button>

        </div>
    </div>

</template>

<script>

import { computed, onMounted, onUpdated } from 'vue'
import { useStore } from 'vuex'
import Timer from '@/components/Timer.vue'

export default {
    components: {
        Timer
    },
    setup() {
        const store = useStore()

        const index = computed(() => {
            return store.state.index
        })

        const triviaLength = computed(() => {
            return store.getters.triviaLength
        })

        const percentage = computed(() => {
            return ((index.value+1)/triviaLength.value) * 100
        })

        const question = computed(() => {
            return store.state.triviaQuestions[index.value]
        })

        const getRandomInt = max => {
            return Math.floor(Math.random() * Math.floor(max));
        }

        const options = computed(() => {
            let answers = [...store.state.triviaQuestions[index.value].incorrect_answers]
            answers.splice(getRandomInt(4), 0, store.state.triviaQuestions[index.value].correct_answer)
            return answers
        })
        
        const answer = computed(() => {
            return store.state.triviaQuestions[index.value].correct_answer
        })

        // Decodificar resultados de la API
        const decodeHTML = (str) => {
            let txt = document.createElement("textarea")
            txt.innerHTML = str
            return txt.value
        }

        // Selección de respuesta, commits de mutations
        const handleOption = (event) => {
            let el = event.target
            el.classList.add('scale-105')
            
            let val = el.innerText
            let encodedAnswer = decodeHTML(answer.value)

            el.classList.remove('dark:bg-gray-700', 'hover:bg-gray-600')

            if (val == encodedAnswer) {
                el.classList.add('bg-green-500')
                store.commit('SCORE_POINT')
            } else {
                el.classList.add('bg-red-500')
            }

            if (index.value < triviaLength.value) {
                progressBar()
                animOut()
                setTimeout(() => {
                    el.classList.remove('scale-105', 'bg-green-500', 'bg-red-500')
                    el.classList.add('dark:bg-gray-700', 'hover:bg-gray-600')
                    store.commit('NEXT_QUESTION')
                    }, 500)
            } else {
                return
            }
        }

        // Animación barra de progreso
        const progressBar = () => {
            let progress = document.getElementById('progress-bar')
            progress.style.width = percentage.value + '%'
        }

        const animOut = () => {
            gsap.to("#questionAnim", {opacity: 0, duration: 0.6, ease: 'expo.out'})
        }

        const animIn = () => {
            gsap.to("#questionAnim", {opacity: 1, delay: 0.7, duration: 0.3, ease: 'expo.in'})
        }

        const title = () => {
            document.title = `Question ${index.value + 1} / ${triviaLength.value}`
        }

        onMounted(() => {
            title()
        })

        onUpdated(() => {
            title()
            animIn()
            store.commit('COUNTDOWN_RESET')
        })

        return {
            question,
            options,
            answer,
            decodeHTML,
            handleOption
        }
    }
}
</script>

<style>

</style>