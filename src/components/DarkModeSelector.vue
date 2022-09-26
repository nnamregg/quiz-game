<template>
    <div class="bg-neutral-100 dark:bg-neutral-800 w-12 h-12 p-3 rounded-full flex justify-center items-center hover:shadow-lg cursor-pointer">
        <span class="mdi mdi-theme-light-dark mdi-24px"
        @click="changeTheme"></span>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

function setTheme(){
    console.log('setTheme onMounted ... -> ', localStorage.theme)
    if(localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
        localStorage.theme = 'dark'
    } else {
        document.documentElement.classList.remove('dark')
        localStorage.theme = 'light'
    }
}

function changeTheme(e){
    // console.log('changeTheme from selector ... -> ', localStorage.theme)
    console.log(e.target)
    // implementar animacion aca
    if(localStorage.theme === 'dark') {
        localStorage.theme = 'light'
        document.documentElement.classList.remove('dark')
    } else if(localStorage.theme === 'light') {
        localStorage.theme = 'dark'
        document.documentElement.classList.add('dark')
    }
}

onMounted(() => {
    setTheme()
})

</script>
