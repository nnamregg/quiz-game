<script setup>
import { onMounted, computed, ref, defineAsyncComponent } from "vue";
import { useStore } from "@/stores/main";
import gsap from "gsap";
import Button from "@/components/Button.vue";

const store = useStore();

const VIEWS = {
  TIMED_OUT: defineAsyncComponent(
    () => import("@/components/Results/TimedOut.vue"),
  ),
  FINAL_SCORE: defineAsyncComponent(
    () => import("@/components/Results/FinalScore.vue"),
  ),
};

const currentView = computed(() =>
  isTimedOut.value ? VIEWS["TIMED_OUT"] : VIEWS["FINAL_SCORE"],
);
const isTimedOut = computed(() => store.index === null);

const btnsContainerRef = ref(null);
const viewContainerRef = ref(null);
const animateOut = ref(false);

const resetQuiz = () => {
  triggerAnimateOut();
  setTimeout(() => {
    store.restartQuiz();
  }, 800);
};

const newQuiz = () => {
  triggerAnimateOut();
  setTimeout(() => {
    store.clearQuiz();
  }, 800);
};

const tl = gsap.timeline({ ease: "expo1.out", duration: 0.5 });

function buildTimeline() {
  tl.fromTo(
    btnsContainerRef.value,
    { opacity: 0, translateY: 250 },
    { opacity: 1, translateY: 0 },
  );
}

function triggerAnimateOut() {
  animateOut.value = true;
  tl.reverse();
}

const setTitle = (title) => {
  document.title = title;
};

onMounted(() => {
  buildTimeline();
});
</script>

<template>
  <div class="flex h-full w-full flex-col pt-16">
    <div ref="viewContainerRef" class="relative my-12">
      <component
        :is="currentView"
        :animate-out="animateOut"
        @set-title="setTitle"
      ></component>
    </div>
    <div ref="btnsContainerRef" class="grid w-full grid-cols-1 md:grid-cols-2">
      <Button @action="resetQuiz">
        <span class="mdi mdi-restart mdi-18px mr-2 mt-1"></span>Restart
      </Button>
      <Button @action="newQuiz">
        <span class="mdi mdi-restart-alert mdi-18px mr-2 mt-1"></span>New Quiz
      </Button>
    </div>
  </div>
</template>
