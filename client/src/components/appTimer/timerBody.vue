<template lang="pug">
.flex.justify-center
  .wrapper(v-if="timerStore.startingPromodoroTimer")
    TimerProgressCicle(:counter="timerStore.getPromodoroCounter" :timing="timerStore.promodoro" :timerNpt="settingsStore.state.promodoro_npt")
  .wrapper(v-else-if="timerStore.startingShortBreakTimer") 
    TimerProgressCicle(:counter="timerStore.getShortBreakCounter" :timing="timerStore.shortBreak" :timerNpt="settingsStore.state.shortBreak_npt")
  .wrapper(v-else-if="timerStore.startingLongBreakTimer")
    TimerProgressCicle(:counter="timerStore.getLongBreakCounter" :timing="timerStore.longBreak" :timerNpt="settingsStore.state.longBreak_npt")
</template>

<script setup>
import TimerProgressCicle from "./progressCicle.vue";
import { useSettingsStore } from "@/stores/settings";
import { useCounterStore } from "@/stores/timer";

const settingsStore = useSettingsStore();
const timerStore = useCounterStore();
</script>

<style scoped></style>
