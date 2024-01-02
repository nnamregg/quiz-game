<script setup>
import { ref, watch, computed } from "vue";
import { twMerge as twm } from "tailwind-merge";

const props = defineProps({
  activate: {
    type: Boolean,
    required: false,
  },
});

const emit = defineEmits(["timeOut"]);

const TIME_LIMIT = 10;
const COLORS = {
  info: {
    color: "stroke-teal-500",
  },
  warning: {
    color: "stroke-orange-500",
    threshold: 5,
  },
  alert: {
    color: "stroke-red-500",
    threshold: 3,
  },
};

const timePassed = ref(0);

const timeLeft = computed(() => TIME_LIMIT - timePassed.value);
const isTimedOut = computed(() => !(timeLeft.value > 0));
const timeFraction = computed(() => {
  const rawTimeFraction = timeLeft.value / 10;
  return rawTimeFraction - (1 / 10) * (1 - rawTimeFraction);
});
const circleDasharray = computed(
  () => `${(timeFraction.value * 283).toFixed(0)} 283`,
);
const remainingPathColor = computed(() => {
  const { alert, warning, info } = COLORS;

  if (timeLeft.value <= alert.threshold) {
    return alert.color;
  } else if (timeLeft.value <= warning.threshold) {
    return warning.color;
  } else {
    return info.color;
  }
});

const timerInterval = ref(null);

const startTimer = () => {
  if (timerInterval.value) stopTimer();
  timerInterval.value = setInterval(() => timePassed.value++, 1000);
};

const stopTimer = () => {
  clearInterval(timerInterval.value);
  setTimeout(() => {
    timePassed.value = 0;
  }, 500);
};

watch(isTimedOut, (newVal) => {
  if (newVal) emit("timeOut");
});

watch(
  () => props.activate,
  (activate) => activate ? startTimer() : stopTimer(),
  { immediate: true },
);
</script>

<template>
  <div class="relative h-10 w-10 lg:h-12 lg:w-12">
    <svg
      class="-scale-x-100"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g class="nofill">
        <circle
          class="stroke-neutral-500 stroke-[7px] dark:stroke-neutral-700 dark:stroke-[8px]"
          cx="50"
          cy="50"
          r="46.5"
        />
        <path
          :stroke-dasharray="circleDasharray"
          :class="twm('remaining_path', remainingPathColor)"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
            "
        ></path>
      </g>
    </svg>
    <span
      class="absolute top-0 flex h-10 w-10 items-center justify-center text-xl lg:h-12 lg:w-12 lg:text-2xl"
    >
      {{ timeLeft }}
    </span>
  </div>
</template>

<style scoped>
.nofill {
  fill: none !important;
  stroke: none !important;
}
.remaining_path {
  stroke-width: 8.5px;
  stroke-linecap: round;
  transform: rotate(90deg);
  transform-origin: center;
  transition: 1s linear all;
  fill-rule: nonzero;
}
</style>
