<template>

    <div class="md:h-3/5 w-8 my-auto ml-8 py-4">
        
        <div
            :class="btnClasses" class="z-50"
            @click="toggleOptions"
        >
            <span :class="btnIcoClasses" class="mdi-coach-lamp"></span>
        </div>

        <div
            id="btn-one"
            :class="btnClasses" class="z-40"
            @click="changeTheme('dark')"
        >
            <span :class="btnIcoClasses" class="mdi-weather-night"></span>
        </div>
        
        <div
            id="btn-two"
            :class="btnClasses" class="z-30"
            @click="changeTheme('light')"
        >
            <span :class="btnIcoClasses" class="mdi-weather-sunny"></span>
        </div>
        
        <div
            id="btn-three"
            :class="btnClasses" class="z-20"
            @click="changeTheme('system')"
        >
            <span :class="btnIcoClasses" class="mdi-monitor-eye"></span>
        </div>

    </div>

</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import gsap from 'gsap';

const showOptions = ref(false)

const btnClasses = 'w-8 h-8 absolute border rounded-full flex justify-center items-center cursor-pointer bg-neutral-100 text-neutral-700 hover:shadow-lg hover:text-pink-400 hover:border-pink-400 dark:bg-neutral-900 dark:text-neutral-500 dark:border-neutral-500 dark:hover:bg-pink-500 dark:hover:text-neutral-900 dark:hover:border-none'
const btnIcoClasses = 'mdi mdi-18px mdi-flip-h '

function setTheme(){
    // console.log('setTheme onMounted ... -> ', localStorage.theme)
    if(localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
        localStorage.theme = 'dark'
    } else {
        document.documentElement.classList.remove('dark')
        localStorage.theme = 'light'
    }
}

function toggleOptions(){
    showOptions.value = !showOptions.value
}

const setDarkMode = () => {
    document.documentElement.classList.add('dark')
    localStorage.theme = 'dark'
}

const setLightMode = () => {
    document.documentElement.classList.remove('dark')
    localStorage.theme = 'light'
}

function changeTheme(theme){
    if (theme !== 'system') {
        theme === 'dark' ?
        setDarkMode() :
        setLightMode()
    } else {
        localStorage.removeItem('theme')
        setTheme()
    }
    showOptions.value = false
}

const animIn = () => {
    gsap.fromTo('#btn-one', {opacity: 0, y: 0}, {opacity: 1, y: 45, duration: .2, ease: 'sine.inOut'})
    gsap.fromTo('#btn-two', {opacity: 0, y: 0}, {opacity: 1, y: 90, duration: .2, ease: 'sine.inOut'})
    gsap.fromTo('#btn-three', {opacity: 0, y: 0}, {opacity: 1, y: 135, duration: .2, ease: 'sine.inOut'})
}

const animOut = () => {
    gsap.to('#btn-one', {opacity: 0, y: 0, duration: .2, ease: 'sine.out'})
    gsap.to('#btn-two', {opacity: 0, y: 0, duration: .2, ease: 'sine.out'})
    gsap.to('#btn-three', {opacity: 0, y: 0, duration: .2, ease: 'sine.out'})
} 

onMounted(() => {
    setTheme()
})

watch(showOptions, (newVal) => {
    newVal === true ?
    animIn() :
    animOut()
})

</script>
