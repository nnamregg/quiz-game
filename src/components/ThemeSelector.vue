<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { twMerge as twm } from "tailwind-merge";
import gsap from "gsap";

const bodyElement = ref(document.documentElement);
const currentThemeSelection = ref(null);
const showOptions = ref(false);
const optionsContainer = ref(null);
const btns = ref([]);

const remainingThemes = computed(() => {
  return Object.keys(themes).filter(
    (key) => key !== currentThemeSelection.value,
  );
});

const themes = {
  dark: {
    ico: "mdi-weather-night",
    name: "Dark",
  },
  light: {
    ico: "mdi-weather-sunny",
    name: "Light",
  },
  system: {
    ico: "mdi-monitor-eye",
    name: "System",
  },
};

const BTN_CLASSES =
  "mx-auto flex w-24 items-center justify-center rounded-full border-2 border-neutral-400/50 bg-neutral-100 p-2 text-xs font-semibold text-neutral-400 hover:bg-neutral-50 active:border-pink-400 active:text-pink-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-700 dark:hover:bg-neutral-800/75 dark:active:border-teal-500 dark:active:text-teal-500";
const BTN_ICO_CLASSES = "mdi text-base mdi-flip-h relative mr-2";

const setThemeFromLocalStorage = () => {
  localStorage.theme ? setTheme(localStorage.theme) : setTheme("system");
};

const setTheme = (theme) => {
  if (theme === currentThemeSelection.value) return;

  console.log("setTheme did NOT return!");
  currentThemeSelection.value = theme;

  switch (theme) {
    case "light":
      setLightMode();
      break;
    case "dark":
      setDarkMode();
      break;
    default:
      setSystemPrefMode();
      break;
  }

  if (showOptions.value) toggleOptions();
};

const toggleOptions = () => {
  if(showOptions.value) {
    animOut();
    setTimeout(() => {
      showOptions.value = false;
    }, 400);
  } else {
    showOptions.value = true;
    setTimeout(() => {
      animIn();
    }, 10);
  }
};

const setDarkMode = () => {
  bodyElement.value.classList.add("dark");
  localStorage.theme = "dark";
};

const setLightMode = () => {
  bodyElement.value.classList.remove("dark");
  localStorage.theme = "light";
};

const setSystemPrefMode = () => {
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? bodyElement.value.classList.add("dark")
    : bodyElement.value.classList.remove("dark");

  localStorage.removeItem("theme");
};

// Animaciones
function animIn() {
  gsap.fromTo(
    optionsContainer.value,
    { opacity: 0 },
    { opacity: 1, duration: 0.5, ease: "sine.in" },
  );
  gsap.fromTo(
    optionsContainer.value,
    { y: -15 },
    { y: 0, duration: 0.25, ease: "sine.in" },
  );
  gsap.fromTo(
    btns.value.at(0),
    { x: 50 },
    { x: 0, delay: 0.2, duration: 0.4, ease: "sine.in" },
  );
  gsap.fromTo(
    btns.value.at(1),
    { x: -50 },
    { x: 0, delay: 0.2, duration: 0.4, ease: "sine.in" },
  );
}

function animOut() {
  gsap.fromTo(
    optionsContainer.value,
    { opacity: 1 },
    { opacity: 0, delay: 0.2, duration: 0.2, ease: "ease.out" },
  );
  gsap.fromTo(
    optionsContainer.value,
    { y: 0 },
    { y: -15, delay: 0.25, duration: 0.15, ease: "sine.out" },
  );
  gsap.fromTo(
    btns.value.at(0),
    { x: 0 },
    { x: 50, duration: 0.2, ease: "sine.out" },
  );
  gsap.fromTo(
    btns.value.at(1),
    { x: 0 },
    { x: -50, duration: 0.2, ease: "sine.out" },
  );
}

onBeforeMount(() => {
  setThemeFromLocalStorage();
});
</script>

<template>
  <div class="mx-auto h-auto w-fit">
    <button :class="twm(BTN_CLASSES, 'z-50 mt-6')" @click="toggleOptions">
      <span
        :class="twm(BTN_ICO_CLASSES, themes[currentThemeSelection].ico)"
      ></span>
      {{ themes[currentThemeSelection].name }}
    </button>

    <div
      v-if="showOptions"
      ref="optionsContainer"
      id="options-container"
      class="z-0 mx-auto flex max-w-fit gap-4 py-3 opacity-0"
    >
      <button
        v-for="(theme, i) in remainingThemes"
        :id="`theme-select-btn-${i}`"
        :class="BTN_CLASSES"
        ref="btns"
        @click="setTheme(theme)"
      >
        <span :class="twm(BTN_ICO_CLASSES, themes[theme].ico)"></span>
        {{ themes[theme].name }}
      </button>
    </div>
  </div>
</template>
