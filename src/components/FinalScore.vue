<template>
    <div class="h-full flex flex-col justify-around overflow-hidden">
        <template v-if="(index == triviaLength)">
            <div class="mx-auto anim-top">
                <span class="text-xs block">SCORE:</span>
                <br>
                <span class="bg-gray-100 text-gray-800 text-2xl font-semibold mx-auto px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{{ score }} / {{ triviaLength }}</span>
            </div>
            <div class="text-5xl anim-center">
                <p>{{ finalScore }}</p>
            </div>
        </template>
        <template v-else-if="(index == 100)">
                <h1 class="text-5xl anim-center">Time´s Out</h1>
                <span class="material-icons text-7xl anim-top">
                    hourglass_disabled
                </span>
        </template>
        
        <div>
            <button class="btn block py-2 w-1/2 mx-auto mb-2 focus:dark:bg-teal-400 focus:text-gray-800 focus:scale-105 focus:ring-2 focus:ring-teal-600 leading-5 cursor-pointer transition transform opacity-0" @click="resetQuiz">Restart</button>
            <br>
            <button class="btn block py-2 w-1/2 mx-auto mb-2 focus:dark:bg-teal-400 focus:text-gray-800 focus:scale-105 focus:ring-2 focus:ring-teal-600 leading-5 cursor-pointer transition transform opacity-0" @click="newQuiz">Change Quiz</button>
        </div>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
    setup() {
        const store = useStore()
        const score = computed(() => {
            return store.state.score
        })

        const index = computed(() => {
            return store.state.index
        })

        const triviaLength = computed(() => {
            return store.getters.triviaLength
        })

        const finalScore = computed(() => {
            const avg = (score.value / triviaLength.value) * 100
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
                store.commit('RESET')
            }, 500)
        }

        const newQuiz = () => {
            setTimeout(() => { 
                store.commit('RESET')
                store.commit('SET_QUIZ', '')
            }, 500)
        }

        const scoreAnim = () => {
            gsap.fromTo(".anim-top", {opacity:0, y: -200 }, {opacity:1, y: 0, duration: 0.5, ease: 'power4.in'})
            gsap.fromTo(".anim-center", {opacity:0}, {opacity:1, y: 0, delay:0.8, duration: 1, ease: 'power1.inOut'})
            gsap.fromTo(".btn", {y:300}, {opacity:1, y:0, delay:1, duration:0.8, ease: 'elastic.in(1, 0.1)'})
        }

        const title = () => {
            if (index.value == 100) {
                document.title = 'You´re out of time'
            } else {
                document.title = finalScore.value
            }
        }

        onMounted(() => {
            title()
            scoreAnim()
        })

        return {
            score,
            index,
            triviaLength,
            finalScore,
            resetQuiz,
            newQuiz
        }
    }
}
</script>

<style>

</style>