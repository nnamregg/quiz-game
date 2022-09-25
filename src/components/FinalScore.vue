<template>
    <div class="h-full flex flex-col justify-between py-10 overflow-hidden">
        <template v-if="(store.index == store.quizLength)">
            <div class="mx-auto anim-top">
                <span class="text-xs block mb-2">SCORE:</span>
                <span class="block bg-gray-100 text-gray-800 text-xl md:text-2xl font-semibold mx-auto px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-100">{{ store.score }} / {{ store.quizLength }}</span>
            </div>
            <div class="text-5xl lg:text-7xl max-w-md mx-auto anim-center">
                <p>{{ finalScore }}</p>
            </div>
        </template>
        <template v-else-if="(store.index == 100)">
                <h1 class="text-5xl lg:text-7xl anim-center">Time´s Out</h1>
                <span class="material-icons text-9xl anim-top">
                    hourglass_disabled
                </span>
        </template>
        
        <div>
            <button class="btn lg:inline-block lg:mx-4 w-5/6 lg:w-1/3 leading-5 md:w-1/2 focus:dark:bg-teal-400 focus:text-gray-800 focus:scale-105 focus:ring-2 focus:ring-teal-600 transition transform opacity-0" @click="resetQuiz">Restart</button>
            <!-- <br> -->
            <button class="btn lg:inline-block py-3 w-5/6 lg:w-1/3 text-lg leading-5 md:w-1/2 focus:dark:bg-teal-400 focus:text-gray-800 focus:scale-105 focus:ring-2 focus:ring-teal-600 transition transform opacity-0" @click="newQuiz">Change Quiz</button>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from '@/stores/main'

const store = useStore()

const finalScore = computed(() => {
    const avg = (store.score / store.quizLength) * 100
    if (avg < 40) {
        return 'That was really bad'
    } else if (avg >= 40 && avg <= 70) {
        return 'You can do better'
    } else if (avg > 70 && avg < 100) {
        return 'Nice'
    } else {
        return 'PERFECT!'
    }
})

const resetQuiz = () => {
    setTimeout(() => { 
        store.$patch({
            index: 0,
            score: 0,
            timer: {
                timePassed: 0,
                counterOn: false
            }
        })
    }, 500)
}

const newQuiz = () => {
    setTimeout(() => { 
        store.$patch({
            index: 0,
            score: 0,
            timer: {
                timePassed: 0,
                counterOn: false
            },
            options: {
                amount: 10,
                category: 0,
                difficulty: ''
            },
            questions: []
        })
    }, 500)
}

const scoreAnim = () => {
    gsap.fromTo(".anim-top", {opacity:0, y: -200 }, {opacity:1, y: 0, duration: 0.5, ease: 'power4.in'})
    gsap.fromTo(".anim-center", {opacity:0}, {opacity:1, y: 0, delay:0.8, duration: 1, ease: 'power1.inOut'})
    gsap.fromTo(".btn", {y:300}, {opacity:1, y:0, delay:1, duration:0.8, ease: 'elastic.in(1, 0.1)'})
}

const title = () => {
    if (store.index == 100) {
        document.title = 'You´re out of time'
    } else {
        document.title = finalScore.value
    }
}

onMounted(() => {
    title()
    scoreAnim()
})

</script>
