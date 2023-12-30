<script setup>
import { onMounted, computed, ref } from "vue";
import { useStore } from "@/stores/main";
import gsap from "gsap";
import Button from "@/components/Button.vue";
import TimedOut from "@/components/Results/TimedOut.vue";
import FinalScore from "@/components/Results/FinalScore.vue";

const store = useStore();

const props = defineProps({
  isTimedOut: {
    type: Boolean,
    required: true,
  },
});

const VIEWS = {
  "TIMED_OUT": TimedOut,
  "FINAL_SCORE": FinalScore
}

const currentView = computed(() => props.isTimedOut ? VIEWS["TIMED_OUT"] : VIEWS["FINAL_SCORE"] )

const buttonsContainer = ref(null);
const viewContainer = ref(null);

const resetQuiz = () => {
  tl.play("animateOut");
  setTimeout(() => {
    store.restartQuiz();
  }, 800);
};

const newQuiz = () => {
  tl.play("animateOut");
  setTimeout(() => {
    store.clearQuiz();
  }, 800);
};

const tl = gsap.timeline({ paused: true });

function buildTimeline() {
  tl.fromTo(
    buttonsContainer.value,
    { opacity: 0, y: 250 },
    { opacity: 1, y: 0, delay: 0.5, duration: 0.5, ease: "linear" },
    "animateIn",
  )
    .addPause()
    .to(
      buttonsContainer.value,
      { opacity: 0, y: 250, delay: 0.2, duration: 0.5, ease: "linear" },
      "animateOut"
    )
    .to(
      viewContainer.value,
      { opacity: 0, scale: 0.1, duration: 0.5, ease: "back.in(2)" },
      "animateOut",
    );
}

const setTitle = (title) => {
  document.title = title;
}

onMounted(() => {
  buildTimeline();
  tl.play("animateIn");
});
</script>

<template>
  <div class="flex h-full w-full flex-col pt-16">
    <div ref="viewContainer" class="relative my-12">
      <component :is="currentView" @set-title="setTitle"></component>
    </div>
    <div ref="buttonsContainer" class="grid w-full grid-cols-1 md:grid-cols-2">
      <Button @action="resetQuiz">
        <span class="mdi mdi-restart mdi-18px mr-2 mt-1"></span>Restart
      </Button>
      <Button @action="newQuiz">
        <span class="mdi mdi-restart-alert mdi-18px mr-2 mt-1"></span>New Quiz
      </Button>
    </div>
  </div>
</template>
