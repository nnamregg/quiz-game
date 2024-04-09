<script setup>
import gsap from "gsap";

function onBeforeEnter(el) {
  gsap.set(el, {
    opacity: 0,
  });
}

function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    duration: 0.3,
    ease: "sine.in",
    onComplete: done,
  });
}

function onLeave(el, done) {
  gsap.to(el, {
    opacity: 0,
    duration: 0.3,
    ease: "sine.out",
    onComplete: done,
  });
}
</script>

<template>
  <TransitionGroup
    name="btns"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @leave="onLeave"
  >
    <slot></slot>
  </TransitionGroup>
</template>
