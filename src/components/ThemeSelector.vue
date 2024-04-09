<script setup>
import { ref, computed, onBeforeMount, onMounted, watchEffect } from "vue";
import { twMerge as twm } from "tailwind-merge";
import ThemeSelectorTransition from "./ThemeSelectorTransition.vue";

const emit = defineEmits(["changedTheme"]);

const bodyRef = ref(document.documentElement);
const btnsRef = ref([]);
const currentThemeSelection = ref(null);
const showOptions = ref(false);

const remainingThemes = computed(() => {
  return Object.keys(THEMES).filter(
    (key) => key !== currentThemeSelection.value,
  );
});

const windowWidth = ref(window.innerWidth);

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
  "mx-auto flex h-10 w-10 items-center justify-center rounded-full border-2 border-neutral-300 bg-neutral-100 p-2 text-xs font-semibold text-neutral-400 hover:bg-neutral-50 active:border-pink-400 active:text-pink-400 md:w-24 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-700 dark:hover:bg-neutral-800 dark:active:border-teal-500 dark:active:text-teal-500";
const BTN_ICO_CLASSES = "mdi mdi-flip-h relative text-sm md:mr-2";

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

onMounted(() => {
  window.addEventListener("resize", () => {
    windowWidth.value = window.innerWidth;
  });
});

watchEffect(async () => {
  emit("changedTheme", currentThemeSelection.value);
});
</script>

<template>
  <div class="flex h-24 w-fit flex-row-reverse items-center gap-3 px-4">
    <button :class="twm(BTN_CLASSES, 'z-50')" @click="toggleOptions">
      <span
        :class="twm(BTN_ICO_CLASSES, THEMES[currentThemeSelection].ico)"
      ></span>
      <span v-show="windowWidth >= 640">{{
        THEMES[currentThemeSelection].name
      }}</span>
    </button>
    <ThemeSelectorTransition>
      <template
        v-if="showOptions"
        class="z-0 mx-auto flex max-w-fit gap-4 py-3"
      >
        <button
          v-for="(theme, i) in remainingThemes"
          :id="`theme-select-btn-${i}`"
          :key="`theme-select-btn-${i}`"
          :class="BTN_CLASSES"
          ref="btnsRef"
          @click="setTheme(theme)"
        >
          <span :class="twm(BTN_ICO_CLASSES, THEMES[theme].ico)"></span>
          <span v-if="windowWidth >= 640">{{ THEMES[theme].name }}</span>
        </button>
      </template>
    </ThemeSelectorTransition>
  </div>
</template>
