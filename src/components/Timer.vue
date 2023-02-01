<template>
    <div class="relative w-10 h-10 lg:w-12 lg:h-12">
    <svg class="-scale-x-100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="nofill">
            <circle class="stroke-neutral-500 stroke-[7px] dark:stroke-neutral-700 dark:stroke-[8px]" cx="50" cy="50" r="46.5"/>
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
        {{ store.timeLeft }}
    </span>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from '@vue/runtime-core'
import { useStore } from '@/stores/main'

const store = useStore()
const counterOn = computed(() => store.timer.counterOn)
const timeLeft = computed(() => store.timeLeft)

const timeFraction = computed(() => {
    const rawTimeFraction = store.timeLeft / 10;
    return rawTimeFraction - (1 / 10) * (1 - rawTimeFraction);
})

const circleDasharray = computed(() => `${(timeFraction.value * 283).toFixed(0)} 283`)

const colors = {
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
    const { alert, warning, info } = colors;

    if (timeLeft <= alert.threshold) {
        return alert.color;
    } else if (store.timeLeft <= warning.threshold) {
        return warning.color;
    } else {
        return info.color;
    }
})

const timerInterval = ref(null)
const startTimer = () => {
    clearInterval(timerInterval.value)
    timerInterval.value = setInterval(() => (store.timer.timePassed++), 1000)
}

onMounted(() => {
    store.timer.counterOn = true
})

watch(timeLeft, (newVal) => {
    if (newVal === 0) {
        clearInterval(timerInterval.value)
        store.timer.counterOn = false
        store.index = 100
    }
})

watch(counterOn, (newVal) => {
    if (newVal === true) {
        startTimer()
    } else {
        clearInterval(timerInterval.value)
    }
}) 

</script>
