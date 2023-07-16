<template lang="pug">
section.switch-timers.my-12
  .grid.place-items-center(v-if="!timer.isTimerCounting")
    .btns-conatiner
      button.btn(:class="{ activeTimer: timer.startingPromodoroTimer }" @click="timer.goToPromodoro()") pomodoro
      button.btn(:class="{ activeTimer: timer.startingShortBreakTimer }" @click="timer.getAshortBreak()") short break
      button.btn(:class="{ activeTimer: timer.startingLongBreakTimer }" @click="timer.getAlongBreak()") long break
  WorkingOnTask(v-if="tasksStore.selectedTaskNdx >= 0")
  
</template>

<script setup>
import { useSettingsStore } from "@/stores/settings";
import { useTasksStore } from "@/stores/tasks";
import { useCounterStore } from "@/stores/timer";

import WorkingOnTask from "../appTasks/workingOnTask.vue";

import { ref } from "vue";

const settingsStore = useSettingsStore();
const tasksStore = useTasksStore();
const timer = useCounterStore();

let loggedIn =
  sessionStorage.getItem("authenticated") ||
  localStorage.getItem("authenticated");
</script>

<style scoped>
.btns {
  @apply grid place-items-center my-5;
}
.btns-conatiner {
  @apply inline-block mx-auto px-1 gap-x-3 rounded-3xl text-white;
}
button.btn {
  @apply m-2 px-2.5 py-1.5 rounded-3xl shadow;
}

.promodorsCount {
  @apply flex justify-end text-white my-6;
}
.activeTimer {
  @apply bg-pink;
}
</style>
