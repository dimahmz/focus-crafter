<template lang="pug">
section
  h2 {{setPhrase}}
  .switchBtn
    .circle
  hr
</template>

<script setup>
import { useCounterStore } from "@/stores/timer";
const store = useCounterStore();

defineProps({
  setPhrase: { type: String, required: true },
});
</script>

<style scoped>
section {
  @apply flex justify-between py-5;
}
.switchBtn {
  @apply w-10 h-10 rounded-full bg-red-400;
}
</style>
