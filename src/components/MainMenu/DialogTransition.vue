<script setup>
import { gsap } from "gsap";

function onBeforeEnter(el) {
  gsap.set(el, {
    opacity: 0,
    backgroundColor: "rgba(0, 0, 0, 0)",
    backdropFilter: "blur(0)",
  });
}

function onEnter(el, done) {
  gsap.to(el, {
    backgroundColor: "rgba(38, 38, 38, .5)",
    backdropFilter: "blur(8px)",
    opacity: 1,
    ease: "linear",
    duration: 0.4,
    onComplete: done,
  });
}

function onLeave(el, done) {
  gsap.to(el, {
    backgroundColor: "rgba(0, 0, 0, 0)",
    backdropFilter: "blur(0)",
    opacity: 0,
    ease: "linear",
    duration: 0.2,
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
