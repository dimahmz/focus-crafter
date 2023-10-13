<template lang="pug">
.grid.place-items-center.font-primary.font-mui.text-base
  .btns-conatiner
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
.btns-conatiner {
  @apply w-full max-w-md justify-between flex gap-x-3 px-2 py-1 rounded-3xl bg-app-secondary;
}
.btn {
  @apply px-4 py-3 rounded-3xl text-app-tertiary;
}
.activeTimer {
  @apply bg-app-tertiary text-app-secondary;
}
</style>
