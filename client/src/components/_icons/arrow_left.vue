<template>
  <svg
    width="26"
    height="30"
    viewBox="0 0 26 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="colors_classes"
  >
    <path
      d="M3.14111 15H22.6411"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.64097 22.5L3.14099 15L9.64097 7.5"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
<script setup>
import { defineProps } from "vue";
defineProps({
  colors_classes: { type: String, default: "fill-black" },
});
</script>
