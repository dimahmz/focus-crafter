<template lang="pug">
router-view
</template>

<script setup>
import { onMounted, onBeforeUnmount, onBeforeMount, watch, inject } from "vue";
import { useCounterStore } from "@/stores/timer";
import { useUserStore } from "./stores/user";

const timerStore = useCounterStore();
const userStore = useUserStore();

// // sync the app
// onBeforeMount(() => {
//   const syncing = inject("syncStores");
//   syncing();
// });

onMounted(() => {
  //add a listner to to catch the user confirmation before leaving the page
  window.addEventListener("beforeunload", confirmExit);
});

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", confirmExit);
});

const confirmExit = (event) => {
  // this funtion  knows the timer's state 😎
  timerStore.pauseOrResumeTimer();
  // just leave the page if the timer is not working or unstopped in a session
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
