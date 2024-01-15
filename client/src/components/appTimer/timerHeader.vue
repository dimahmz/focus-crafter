<template lang="pug">
.px-4.grid.place-items-center.font-primary
  div.btns-container
    button(:class="{ activeTimer: timer.startingPomodoroTimer }" @click="timer.goToPomodoro()") Pomodoro
    button(:class="{ activeTimer: timer.startingShortBreakTimer }" @click="timer.getAshortBreak()") Short break
    button(:class="{ activeTimer: timer.startingLongBreakTimer }" @click="timer.getAlongBreak()") Long break
</template>

<script setup>
import { useTasksStore } from "@/stores/tasks";
import { useCounterStore } from "@/stores/timer";

const tasksStore = useTasksStore();
const timer = useCounterStore();
</script>

<style scoped>
.btns-container {
  @apply w-full max-w-[300px] md:max-w-[400px] justify-between flex gap-x-1 p-1.5 md:p-2 rounded-3xl bg-app-secondary;
  @apply text-[11px] md:text-[15px] font-semibold;
  button {
    @apply px-1 py-2 md:py-3 md:px-2 rounded-3xl text-app-tertiary;
  }
  .activeTimer {
    @apply bg-app-tertiary text-app-secondary;
  }
}
</style>
