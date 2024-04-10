<script setup>
import { ref } from "vue";
import ThemeSelector from "@/components/ThemeSelector.vue";

const LOGO_LIGHT = "triviatrek-logo-light.png";
const LOGO_DARK = "triviatrek-logo-dark.png";

const imgSrc = ref(null);

function setImgSrc(theme) {
  switch (theme) {
    case "dark":
      imgSrc.value = LOGO_DARK;
      break;
    case "light":
      imgSrc.value = LOGO_LIGHT;
      break;
    default:
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        imgSrc.value = LOGO_DARK;
      } else {
        imgSrc.value = LOGO_LIGHT;
      }
      break;
  }
}
</script>

<template>
  <header class="h-28 w-full px-4 md:h-48 md:p-6 xl:h-60">
    <div class="mx-auto flex h-full w-full max-w-3xl items-center md:max-w-3xl">
      <div class="mr-auto">
        <img
          :src="imgSrc"
          alt="Logo Triviatrek"
          class="md:mx-auto"
          width="140"
        />
      </div>
      <ThemeSelector @changed-theme="(theme) => setImgSrc(theme)" />
    </div>
  </header>
</template>
