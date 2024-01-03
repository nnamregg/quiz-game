<script setup>
import gsap from "gsap";

const props = defineProps({
  btns: {
    type: Array,
    required: true,
  },
});

function onBeforeEnter(el) {
  gsap.set(el, {
    opacity: 0,
  });

  gsap.set(el, {
    translateY: -15,
  });

  gsap.set(props.btns.at(0), {
    translateX: 50,
    opacity: 0.1,
  });

  gsap.set(props.btns.at(1), {
    translateX: -50,
    opacity: 0.1,
  });
}

function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    duration: 0.5,
    ease: "sine.in",
    onComplete: done,
  });

  gsap.to(el, {
    translateY: 0,
    duration: 0.1,
    ease: "sine.in",
    onComplete: done,
  });

  gsap.to(props.btns.at(0), {
    translateX: 0,
    opacity: 1,
    delay: 0.1,
    duration: 0.3,
    ease: "sine.in",
    onComplete: done,
  });

  gsap.to(props.btns.at(1), {
    translateX: 0,
    opacity: 1,
    delay: 0.1,
    duration: 0.3,
    ease: "sine.in",
    onComplete: done,
  });
}

function onLeave(el, done) {
  gsap.to(el, {
    opacity: 0,
    duration: 0.5,
    ease: "sine.out",
    onComplete: done,
  });

  gsap.to(el, {
    translateY: -15,
    delay: 0.2,
    duration: 0.1,
    ease: "sine.out",
    onComplete: done,
  });

  gsap.to(props.btns.at(0), {
    translateX: 50,
    duration: 0.5,
    opacity: 0.1,
    onComplete: done,
  });

  gsap.to(props.btns.at(1), {
    translateX: -50,
    duration: 0.5,
    opacity: 0.1,
    onComplete: done,
  });
}
</script>

<template>
  <Transition
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @leave="onLeave"
    :css="false"
    mode="out-in"
  >
    <slot></slot>
  </Transition>
</template>
