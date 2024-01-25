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
    duration: 0.3,
    opacity: 1,
    translateY: 0,
    ease: "circ.out",
    onComplete: done,
  });
}

function onLeave(el, done) {
  gsap.to(el, {
    delay: 0.2,
    duration: 0.3,
    opacity: 0,
    translateY: 250,
    ease: "circ.in",
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
  >
    <slot></slot>
  </Transition>
</template>
