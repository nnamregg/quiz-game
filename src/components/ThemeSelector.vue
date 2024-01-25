<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { twMerge as twm } from "tailwind-merge";
import ThemeSelectorTransition from "./ThemeSelectorTransition.vue";

const bodyRef = ref(document.documentElement);
const btnsRef = ref([]);
const currentThemeSelection = ref(null);
const showOptions = ref(false);

const remainingThemes = computed(() => {
  return Object.keys(THEMES).filter(
    (key) => key !== currentThemeSelection.value,
  );
});

const THEMES = {
  dark: {
    ico: "mdi-weather-night",
    name: "Dark",
    set: () => setDarkMode(),
  },
  light: {
    ico: "mdi-weather-sunny",
    name: "Light",
    set: () => setLightMode(),
  },
  system: {
    ico: "mdi-monitor-eye",
    name: "System",
    set: () => setSystemPrefMode(),
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

  currentThemeSelection.value = theme;
  THEMES[theme].set();

  if (showOptions.value) toggleOptions();
};

const toggleOptions = () => (showOptions.value = !showOptions.value);

const setDarkMode = () => {
  bodyRef.value.classList.add("dark");
  localStorage.theme = "dark";
};

const setLightMode = () => {
  bodyRef.value.classList.remove("dark");
  localStorage.theme = "light";
};

const setSystemPrefMode = () => {
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? bodyRef.value.classList.add("dark")
    : bodyRef.value.classList.remove("dark");

  localStorage.removeItem("theme");
};

onBeforeMount(() => {
  setThemeFromLocalStorage();
});
</script>

<template>
  <div class="mx-auto h-24 w-fit">
    <button :class="twm(BTN_CLASSES, 'z-50 mt-6')" @click="toggleOptions">
      <span
        :class="twm(BTN_ICO_CLASSES, THEMES[currentThemeSelection].ico)"
      ></span>
      {{ THEMES[currentThemeSelection].name }}
    </button>

    <ThemeSelectorTransition :btns="btnsRef">
      <div v-show="showOptions" class="z-0 mx-auto flex max-w-fit gap-4 py-3">
        <button
          v-for="(theme, i) in remainingThemes"
          :id="`theme-select-btn-${i}`"
          :class="BTN_CLASSES"
          ref="btnsRef"
          @click="setTheme(theme)"
        >
          <span :class="twm(BTN_ICO_CLASSES, THEMES[theme].ico)"></span>
          {{ THEMES[theme].name }}
        </button>
      </div>
    </ThemeSelectorTransition>
  </div>
</template>
