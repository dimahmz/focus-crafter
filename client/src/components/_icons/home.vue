<template>
  <svg
    width="20"
    height="22"
    viewBox="0 0 20 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.44444 19.5556H6.11111V12.2222H13.4444V19.5556H17.1111V8.55556L9.77778 3.05556L2.44444 8.55556V19.5556ZM0 22V7.33333L9.77778 0L19.5556 7.33333V22H11V14.6667H8.55556V22H0Z"
      :fill="color"
    />
  </svg>
</template>
<script setup>
defineProps({
  color: { type: String, default: "#00738C" },
});
</script>
