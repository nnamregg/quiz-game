<template>

    <div class="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 absolute">
        <div id="progress-bar" class="bg-gray-600 text-xs text-center p-0.5 leading-none w-0 h-4 rounded-full dark:bg-teal-500 transition-all duration-500"></div>
    </div>
   
    <div id="questionAnim" class="w-full mx-auto h-full pt-20 pb-4 px-6 relative">
        <div class="absolute mx-auto top-8 flex justify-between w-[90%] lg:w-[95%]">
            <div class="text-left">
                <small class="block my-1.5 text-xs leading-none lg:text-sm">{{ question.category }}</small>
                <small class="block my-1.5 text-xs leading-none lg:text-sm">{{ question.difficulty.toUpperCase() }}</small>
            </div>
            <div class="text-right">
                <Timer />
            </div>
        </div>
        <div class="flex flex-col justify-between w-full h-full relative">
            <h2 class="text-left text-4xl lg:text-5xl my-10">{{ decodeHTML(question.question) }}</h2>
            <div class="grid grid-cols-1 gap-2 my-0 w-full md:grid-cols-2 md:gap-4">

                <button class="dark:bg-gray-700 dark:border-gray-200 hover:bg-gray-600 border-2 rounded-lg h-14 md:h-16 text-sm lg:text-base px-1 py-auto cursor-pointer transition transform duration-75" 
                v-for="(option, index) in options" :key="index"
                @click="handleOption"
                >
                    {{ decodeHTML(option) }}
                </button>

            </div>
        </div>
    </div>

</template>

<script setup>
import { computed, onMounted, onUpdated } from 'vue'
import { useStore } from '@/stores/main'
import Timer from '@/components/Timer.vue'


const store = useStore()

const percentage = computed(() => {
    return ((store.index+1)/store.quizLength) * 100
})

const question = computed(() => store.currentQuestion )

const answer = computed(() => {
    return question.value.correct_answer
})

// Mezcla opciones de respuestas
const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
}

const options = computed(() => {
    let answers = [...question.value.incorrect_answers]
    answers.splice(getRandomInt(4), 0, answer.value)
    return answers
})

// Decodifica Unicode y caracteres especiales de la respuesta de la API
const decodeHTML = (str) => {
    let txt = document.createElement("textarea")
    txt.innerHTML = str
    return txt.value
}

// Selección de respuesta, manipulación de estilos y commits de mutations
const handleOption = (event) => {
    let el = event.target
    el.classList.add('scale-105')
    
    let val = el.innerText
    let encodedAnswer = decodeHTML(answer.value)

    el.classList.remove('dark:bg-gray-700', 'hover:bg-gray-600')

    if (val == encodedAnswer) {
        el.classList.add('bg-green-500')
        store.score += 1
    } else {
        el.classList.add('bg-red-500')
    }

    if (store.index < store.quizLength) {
        store.timer.counterOn = false
        
        progressBar()
        animOut()

        setTimeout(() => {
            el.classList.remove('scale-105', 'bg-green-500', 'bg-red-500')
            el.classList.add('dark:bg-gray-700', 'hover:bg-gray-600')
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
    gsap.to("#questionAnim", {opacity: 0, delay: 0.8, duration: 0.2, ease: 'expo.out'})
}

const animIn = () => {
    gsap.fromTo("#questionAnim",{opacity:0}, {opacity: 1, delay: 0.3, duration: 0.2, ease: 'expo.in'})
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
