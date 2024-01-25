<script setup>
import { gsap } from "gsap";

function onBeforeEnter(el) {
  gsap.set(el, {
    opacity: 0,
    translateY: 250,
  });
}

function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    translateY: 0,
    ease: "expo.out",
    duration: 0.5,
    onComplete: done,
  });
}

function onLeave(el, done) {
  gsap.to(el, {
    opacity: 0,
    translateY: 250,
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
