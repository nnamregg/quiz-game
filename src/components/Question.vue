<template>

    <div class="h-auto">
        <div class="w-full bg-pink-100 h-2 dark:bg-neutral-800 absolute">
            <div id="progress-bar" class="bg-pink-400 text-xs text-center p-0.5 leading-none w-0 h-2 dark:bg-teal-500 transition-all duration-500"></div>
        </div>
    
        <div id="questionAnim" class="w-full mx-auto mb-72 md:mb-0 h-auto pt-20 pb-4 px-6 relative">
            <div class="absolute mx-auto top-8 flex justify-between w-[90%] lg:w-[95%]">
                <div class="text">
                    <span class="mdi mr-2" :class="difficultyIcon"></span>
                    <small class="my-1.5 text-xs leading-none lg:text-sm">{{ question.category }}</small>
                </div>
                <div class="text-right">
                    <Timer />
                </div>
            </div>
                <h2 class="text-left text-xl md:text-3xl lg:text-5xl my-10">{{ decodeHTML(question.question) }}</h2>
        </div>

        <div id="answersAnim" class="grid grid-cols-1 my-0 w-full md:grid-cols-2 absolute bottom-0">
            <div :class="answerClasses" 
            v-for="(answer, index) in answers" :key="index"
            @click="handleAnswer"
            >
                {{ decodeHTML(answer) }}
            </div>
        </div>
    </div>

</template>

<script setup>
import { computed, onMounted, onUpdated } from 'vue'
import { useStore } from '@/stores/main'
import Timer from '@/components/Timer.vue'
import gsap from 'gsap'

const store = useStore()

const percentage = computed(() => {
    return ((store.index+1)/store.quizLength) * 100
})

const difficultyIcon = computed(() => setDifficultyIcon(store.currentQuestion.difficulty)
)

function setDifficultyIcon(difficulty) {
    const icons = {
        easy: ['mdi-gauge-empty', 'text-green-600', 'dark:text-green-400'],
        medium: ['mdi-gauge', 'text-amber-500', 'dark:text-amber-400'],
        hard: ['mdi-gauge-full', 'text-red-600', 'dark:text-red-400']
    }

    return icons[difficulty]
}

const answerClasses = 'flex justify-center items-center h-16 md:h-20 text-sm lg:text-base font-semibold px-1 py-auto cursor-pointer transition transform duration-75 bg-neutral-200 md:hover:italic md:hover:bg-pink-400 md:hover:text-neutral-100 dark:bg-neutral-900 md:dark:hover:bg-pink-500'

const question = computed(() => store.currentQuestion )
const answer = computed(() => store.currentQuestion.correct_answer )

// Mezcla opciones de respuestas
const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
}

const answers = computed(() => {
    const answersList = [...question.value.incorrect_answers]
    answersList.splice(getRandomInt(4), 0, answer.value)
    return answersList
})

// Decodifica Unicode y caracteres especiales de la respuesta de la API
const decodeHTML = (str) => {
    let txt = document.createElement("textarea")
    txt.innerHTML = str
    return txt.value
}

// Selección de respuesta, manipulación de estilos y animaciones
const handleAnswer = (e) => {
    store.timer.counterOn = false

    let el = e.target
    
    let val = el.innerText
    let decodedAnswer = decodeHTML(answer.value)
    
    el.classList.remove('md:hover:bg-pink-400', 'md:dark:hover:bg-pink-500')

    if (val == decodedAnswer) {
        el.classList.replace('dark:bg-neutral-900', 'bg-green-500')
        store.score += 1
    } else {
        el.classList.replace('dark:bg-neutral-900', 'bg-red-500')
    }

    if (store.index < store.quizLength) {
        // store.timer.counterOn = false
        
        progressBar()
        animOut()

        setTimeout(() => {
            el.classList.remove('bg-green-500', 'bg-red-500')
            el.classList.add('bg-neutral-200', 'dark:bg-neutral-900', 'md:hover:bg-pink-400', 'md:dark:hover:bg-pink-500')
            store.index += 1
            }, 1000)
    } else {
        return
    }
}

// Actualizar valor para barra de progreso
const progressBar = () => {
    let progress = document.getElementById('progress-bar')
    progress.style.width = percentage.value + '%'
}

const animOut = () => {
    gsap.to("#questionAnim", {opacity: 0, delay: 0.7, duration: 0.3, ease: 'expo.out'})
    gsap.to("#answersAnim", {opacity: 0, y: 250, delay: 0.7, duration: 0.3, ease: 'expo.out'})
}

const animIn = () => {
    gsap.fromTo("#questionAnim",{opacity:0}, {opacity: 1, delay: 0.3, duration: 0.2, ease: 'expo.in'})
    gsap.fromTo("#answersAnim", {opacity:0, y: 250}, {opacity:1, y: 0, delay: 0.3, duration: 0.5, ease: 'expo.in'})
}

const title = () => {
    document.title = `Question ${store.index + 1} / ${store.quizLength}`
}

onMounted(() => {
    title()
})

onUpdated(() => {
    title()
    animIn()
    store.timer.timePassed = 0
    setTimeout(() => ( store.timer.counterOn = true ), 500)
})

</script>
