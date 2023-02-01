<template>

    <div class="h-full py-10">

        <template v-if="(store.index == store.quizLength)">
            <div class="anim-top mx-auto mt-4 w-28 rounded flex justify-between items-center bg-pink-100 dark:bg-neutral-800">
                <span class="mdi mdi-scoreboard mdi-18px pl-2 text-pink-400 dark:text-pink-500"></span>
                <span class="text-2xl lg:text-3xl font-semibold mx-auto px-2.5 py-0.5 rounded">{{ store.score }} / {{ store.quizLength }}</span>
            </div>
            <div class="anim-center max-w-md mx-auto mt-16">
                <span class="mdi mdi-36px" :class="finalScore.ico"></span>
                <p class="text-4xl lg:text-5xl ">{{ finalScore.text }}</p>
            </div>
        </template>

        <template v-else-if="(store.index == 100)">
            <h1 class="uppercase italic text-2xl lg:text-xl text-red-600 mb-16 anim-top">Out of time</h1>
            <span class="mdi mdi-skull-crossbones text-9xl anim-center"></span>
        </template>

        <div class="anim-btn grid grid-cols-1 my-0 w-full md:grid-cols-2 absolute bottom-0">
            <div :class="btnClasses" @click="resetQuiz"><span class="mdi mdi-restart mdi-18px mr-2"></span>Restart</div>
            <div :class="btnClasses" @click="newQuiz"><span class="mdi mdi-restart-alert mdi-18px mr-2"></span>New Quiz</div>
        </div>

    </div>

</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from '@/stores/main'
import gsap from 'gsap'

const store = useStore()

const btnClasses = 'uppercase flex justify-center items-center h-16 text-sm lg:text-base font-semibold px-1 py-auto cursor-pointer transition transform duration-75 bg-neutral-200 hover:italic text-pink-400 hover:text-neutral-100 hover:bg-pink-400 dark:text-pink-500 dark:bg-neutral-900 dark:hover:bg-pink-500 dark:hover:text-neutral-900'

const finalScore = computed(() => {
    const avg = (store.score / store.quizLength) * 100
    return getFinalScore(avg)
})

const scores = {
    terrible: {
        threshold: 40,
        text: 'Awfull',
        ico: 'mdi-death-star-variant'
    },
    low: {
        threshold: 70,
        text: 'Not so bad',
        ico: 'mdi-death-star'
    },
    nice: {
        threshold: 99,
        text: 'Nice',
        ico: 'mdi-candy'
    },
    perfect: {
        threshold: 100,
        text: 'Perfect!',
        ico: 'mdi-unicorn-variant'
    }
}

function getFinalScore(avg){
    const { terrible, low, nice, perfect } = scores

    if (avg < terrible.threshold) {
        return terrible
    } else if (avg <= low.threshold) {
        return low
    } else if (avg <= nice.threshold) {
        return nice
    } else {
        return perfect
    }
}

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
    gsap.fromTo(".anim-top", {opacity:0, y: -200 }, {opacity:1, y: 0, duration: 0.4, ease: 'power4.in'})
    gsap.fromTo(".anim-center", {opacity:0}, {opacity:1, y: 0, delay:0.6, duration: 1, ease: 'power1.inOut'})
    gsap.fromTo(".anim-btn", {opacity:0}, {opacity:1, y:0, delay:1, duration:0.8, ease: 'linear'})
}

const title = () => {
    if (store.index == 100) {
        document.title = 'Out of time'
    } else {
        document.title = finalScore.value.text
    }
}

onMounted(() => {
    title()
    scoreAnim()
})

</script>
