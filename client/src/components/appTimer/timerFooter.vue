<template lang="pug">
section
  .flex-center(v-if="!timerStore.isTimerCounting")
    .btn-box.bg-app-tertiary(@click="start()")
      startBtn
  .flex-center(v-else)
    .flex.gap-x-5.items-center
      .btn-box.bg-app-tertiary.bg-app-quaternary(@click="timerStore.restartTimer()")
        restart(colors_classes="fill-app-tertiary")
      .btn-box.bg-app-tertiary(@click="timerStore.pauseOrResumeTimer()")
        startBtn(v-if="timerStore.pauseTimer")
        pause(v-else )
      ConfirmModal
</template>

<script setup>
import startBtn from "../_icons/start.vue";
import restart from "../_icons/restart.vue";
import pause from "../_icons/pause.vue";
import Next from "../_icons/next.vue";
import { useCounterStore } from "@/stores/timer";
import { useTasksStore } from "@/stores/tasks";
import ConfirmModal from "./confirmChange.vue";
import { onMounted, onUnmounted } from "vue";

const tasksStore = useTasksStore();
const timerStore = useCounterStore();

//start the timer
function start() {
  if (timerStore.startingPomodoroTimer) timerStore.startPomodoroTimer();
  else if (timerStore.startingShortBreakTimer)
    timerStore.startShortBreakTimer();
  else timerStore.startLongBreakTimer();
}


// toggle the timer when the space bar is clicked
function onSpaceClicked(event) {
  if (event.code == "Space") {
    if(timerStore.isTimerCounting) timerStore.pauseOrResumeTimer()
    else start()
  }
}

onMounted(() => {
  //add a listner to to catch the user confirmation before leaving the page
  document.addEventListener("keyup", onSpaceClicked);
});

// remove keyboard event listener
onUnmounted(() => {
  document.removeEventListener("keyup", onSpaceClicked);
});

// change the timer
</script>

<style scoped>
.btn-box {
  @apply rounded-xl p-3 sm:p-4 cursor-pointer z-40;
}
svg {
  @apply h-4 sm:h-5 w-4 sm:w-5;
}
</style>
