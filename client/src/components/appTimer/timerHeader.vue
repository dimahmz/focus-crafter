<template lang="pug">
.grid.place-items-center.font-primary.text-base.font-semibold
  div.btns-container(class="text-[13px] sm:text-[18px]")
    button.btn(:class="{ activeTimer: timer.startingPromodoroTimer }" @click="timer.goToPromodoro()") Pomodoro
    button.btn(:class="{ activeTimer: timer.startingShortBreakTimer }" @click="timer.getAshortBreak()") Short break
    button.btn(:class="{ activeTimer: timer.startingLongBreakTimer }" @click="timer.getAlongBreak()") Long break
</template>

<script setup>
import { useTasksStore } from "@/stores/tasks";
import { useCounterStore } from "@/stores/timer";

const tasksStore = useTasksStore();
const timer = useCounterStore();
</script>

<style scoped>
.btns-container {
  @apply w-full max-w-[300px] sm:max-w-[400px] justify-between flex gap-x-1 p-1 sm:p-1.5 rounded-3xl bg-app-secondary;
}
.btn {
  @apply px-2 py-3 sm:py-4 sm:px-3 rounded-3xl text-app-tertiary;
}
.activeTimer {
  @apply bg-app-tertiary text-app-secondary;
}
</style>
