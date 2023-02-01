<template>

    <div class="absolute w-auto my-auto ml-8 md:py-4">
        
        <button
            :class="btnClasses" class="absolute z-50"
            @click="toggleOptions"
        >
            <span :class="btnIcoClasses + ' ' + themes[currentThemeSelection].ico"></span>
        </button>

        <div v-for="(theme, key) in themes" :id="`btn-${key}`" class="absolute flex items-center w-auto group">
            <button
                :class="btnClasses"
                @click="setTheme(key)"
            >
                <span :class="btnIcoClasses + ' ' + theme.ico" ></span>
            </button>
            
            <div class="absolute hidden left-8 font-bold text-sm text-neutral-700 dark:text-pink-400 py-1.5 px-2 lg:group-hover:block">
                <p>{{ themes[key].name }}</p>
            </div>
        </div>

    </div>

</template>

<script setup>
import { ref, watch, onBeforeMount } from 'vue';
import gsap from 'gsap';

const showOptions = ref(false)

const btnClasses = 'w-8 h-8 border rounded-full flex justify-center items-center cursor-pointer bg-neutral-100 text-neutral-700 md:hover:shadow-lg md:hover:text-pink-400 md:hover:border-pink-400 dark:bg-neutral-900 dark:text-neutral-700 dark:border-neutral-800 md:dark:hover:bg-pink-500 md:dark:hover:text-neutral-900 md:dark:hover:border-none'
const btnIcoClasses = 'relative mdi mdi-18px mdi-flip-h'

const themes = {
    dark: {
        ico: 'mdi-weather-night',
        name: 'Oscuro'
    },
    light: {
        ico: 'mdi-weather-sunny',
        name: 'Claro'
    },
    system: {
        ico: 'mdi-monitor-eye',
        name: 'Sistema'
    }
}

const currentThemeSelection = ref('system')

const checkLocalStorageTheme = () => {
    localStorage.theme
        ? setTheme(localStorage.theme)
        : setTheme('system')
}

const setTheme = theme => {
    currentThemeSelection.value = theme

    if(theme == 'system') {
        setSystemPrefMode()
    } else {
        theme == 'dark'
            ? setDarkMode()
            : setLightMode()
    }

    if(showOptions.value) toggleOptions()
}

const toggleOptions = () => {
    showOptions.value = !showOptions.value
}

const bodyElement = document.documentElement

const setDarkMode = () => {
    bodyElement.classList.add('dark')
    localStorage.theme = 'dark'
}

const setLightMode = () => {
    bodyElement.classList.remove('dark')
    localStorage.theme = 'light'
}

const setSystemPrefMode  = () => {
    window.matchMedia('(prefers-color-scheme: dark)').matches
        ? bodyElement.classList.add('dark')
        : bodyElement.classList.remove('dark')
    localStorage.removeItem('theme')
}

const animIn = () => {
    if (window.innerWidth >= 768 ){
        gsap.fromTo('#btn-dark', {opacity: 0, y: 0}, {opacity: 1, y: 45, duration: .2, ease: 'sine.inOut'})
        gsap.fromTo('#btn-light', {opacity: 0, y: 0}, {opacity: 1, y: 90, duration: .2, ease: 'sine.inOut'})
        gsap.fromTo('#btn-system', {opacity: 0, y: 0}, {opacity: 1, y: 135, duration: .2, ease: 'sine.inOut'})
    } else {
        gsap.fromTo('#btn-dark', {opacity: 0, x: 0}, {opacity: 1, x: -45, duration: .2, ease: 'sine.inOut'})
        gsap.fromTo('#btn-light', {opacity: 0, x: 0}, {opacity: 1, x: -90, duration: .2, ease: 'sine.inOut'})
        gsap.fromTo('#btn-system', {opacity: 0, x: 0}, {opacity: 1, x: -135, duration: .2, ease: 'sine.inOut'})
    }
}

const animOut = () => {
        gsap.to('#btn-dark', {opacity: 0, x: 0, y: 0, duration: .2, ease: 'sine.out'})
        gsap.to('#btn-light', {opacity: 0, x: 0, y: 0, duration: .2, ease: 'sine.out'})
        gsap.to('#btn-system', {opacity: 0, x: 0, y: 0, duration: .2, ease: 'sine.out'})
} 

onBeforeMount(() => {
    checkLocalStorageTheme()
})


watch(showOptions, (newVal) => {
    newVal === true
        ? animIn()
        : animOut()
})

</script>
