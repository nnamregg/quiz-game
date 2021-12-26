<template>
    <div class="relative w-10 h-10 lg:w-12 lg:h-12">
    <svg class="-scale-x-100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="nofill">
            <circle class="stroke-gray-600 stroke-[8px]" cx="50" cy="50" r="46.5"/>
            <path
            :stroke-dasharray="circleDasharray"
            class="remaining_path"
            :class="remainingPathColor"
            d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
            "
            ></path>
        </g>
    </svg>
    <span class="absolute w-10 h-10 lg:w-12 lg:h-12 top-0 flex items-center justify-center text-xl lg:text-2xl">
        {{ timeLeft }}
    </span>
  </div>
</template>

<script>
import { computed, onMounted, watch } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
    setup() {
        const store = useStore()

        const counterOn = computed(() => {
            return store.state.timer.counter_on
        })

        const timeLeft = computed(() => {
            return store.getters.timeLeft
        })

        const timeFraction = computed(() => {
            const rawTimeFraction = timeLeft.value / 10;
            return rawTimeFraction - (1 / 10) * (1 - rawTimeFraction);
        })

        const circleDasharray = computed(() => {
            return `${(timeFraction.value * 283).toFixed(0)} 283`
        })

        const color_codes = {
            info: {
                color: 'stroke-teal-500'
            },
            warning: {
                color: 'stroke-orange-500',
                threshold: 5
            },
            alert : {
                color: 'stroke-red-500',
                threshold: 3
            }
        }

        const remainingPathColor = computed(() => {
            const { alert, warning, info } = color_codes;

            if (timeLeft.value <= alert.threshold) {
                return alert.color;
            } else if (timeLeft.value <= warning.threshold) {
                return warning.color;
            } else {
                return info.color;
            }
        })

        let timerInterval
        const startTimer = () => {
            timerInterval = setInterval(() => (store.commit('COUNTDOWN')), 1000)
        }

        onMounted(() => {
            store.commit('COUNTER_CONTROL', true)
        })

        watch(timeLeft, (newVal) => {
            if (newVal == 0) {
                store.commit('TIMES_OUT')
                store.commit('COUNTER_CONTROL', false)
            }
        })

        watch(counterOn, (newVal) => {
            if (newVal == false) {
                clearInterval(timerInterval)
            } else {
                startTimer()
            }
        })

        return {
            timeLeft,
            circleDasharray,
            remainingPathColor
        }
    }
}
</script>

<style>

</style>