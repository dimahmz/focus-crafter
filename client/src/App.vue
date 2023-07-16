<template lang="pug">
router-view
</template>

<script setup>
import { onMounted, onBeforeUnmount, watch, inject } from "vue";
import { useCounterStore } from "@/stores/timer";

const timerStore = useCounterStore();

// confirm before leaving the page
onMounted(() => {
  window.addEventListener("beforeunload", confirmExit);
  // sync the app
  const syncing = inject("syncStores");
  syncing();
});

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", confirmExit);
});

const confirmExit = (event) => {
  // this funtion  knows the timer's state 😎
  timerStore.pauseOrResumeTimer();
  // don't leave the page if the timer is working or stopped in a session
  if (!timerStore.isTimerCounting) return false;

  event.preventDefault();
  event.returnValue = "";
  timerStore.pauseOrResumeTimer();
};

// sync the web-app title with the timer
watch(timerStore, () => {
  if (timerStore.isTimerCounting)
    document.title = timerStore.getCurrentTimerValue;
});
</script>
<style scoped></style>
