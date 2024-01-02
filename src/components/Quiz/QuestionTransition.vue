<script setup>
import { gsap } from "gsap";

function onBeforeEnter(el) {
  gsap.set(el, {
    opacity: 0,
    translateX: 500,
  });
}

function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    translateX: 0,
    ease: "expo.out",
    duration: 0.5,
    onComplete: done,
  });
}

function onLeave(el, done) {
  gsap.to(el, {
    opacity: 0,
    translateX: -500,
    ease: "expo.in",
    duration: 0.5,
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
    appear
  >
    <slot></slot>
  </Transition>
</template>
