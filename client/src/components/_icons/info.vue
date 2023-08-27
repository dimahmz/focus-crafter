<template>
  <svg
    width="23"
    height="22"
    viewBox="0 0 23 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.8328 5.5H13.0328V7.7H10.8328V5.5ZM10.8328 9.9H13.0328V16.5H10.8328V9.9ZM11.9328 0C5.8608 0 0.9328 4.928 0.9328 11C0.9328 17.072 5.8608 22 11.9328 22C18.0048 22 22.9328 17.072 22.9328 11C22.9328 4.928 18.0048 0 11.9328 0ZM11.9328 19.8C7.0818 19.8 3.1328 15.851 3.1328 11C3.1328 6.149 7.0818 2.2 11.9328 2.2C16.7838 2.2 20.7328 6.149 20.7328 11C20.7328 15.851 16.7838 19.8 11.9328 19.8Z"
      fill="#BCC7D2"
    />
  </svg>
</template>
<script setup>
import { defineProps } from "vue";
defineProps({
  color: { type: String, default: "#00738C" },
});
</script>
