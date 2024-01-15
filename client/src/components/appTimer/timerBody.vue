<template lang="pug">
.flex-center.h-full
  .wrapper(v-if="timerStore.startingPomodoroTimer")
    TimerProgressCicle(:counter="timerStore.getPomodoroCounter" :timing="timerStore.pomodoro" :timerNpt="settingsStore.state.timer.pomodoro_npt")
  .wrapper(v-else-if="timerStore.startingShortBreakTimer") 
    TimerProgressCicle(:counter="timerStore.getShortBreakCounter" :timing="timerStore.shortBreak" :timerNpt="settingsStore.state.timer.shortBreak_npt")
  .wrapper(v-else-if="timerStore.startingLongBreakTimer")
    TimerProgressCicle(:counter="timerStore.getLongBreakCounter" :timing="timerStore.longBreak" :timerNpt="settingsStore.state.timer.longBreak_npt")
</template>

<script setup>
import TimerProgressCicle from "./progressCicle.vue";
import { useSettingsStore } from "@/stores/settings";
import { useCounterStore } from "@/stores/timer";

const settingsStore = useSettingsStore();
const timerStore = useCounterStore();
</script>
