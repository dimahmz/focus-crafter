<template lang="pug">
.timer-container
  .wrapper(v-if="timerStore.startingPromodoroTimer")
    timerProgressCicle(:counter="timerStore.getPromodoroCounter" :timing="timerStore.promodoro" :timerNpt="settingsStore.state.promodoro_npt")
  .wrapper(v-else-if="timerStore.startingShortBreakTimer") 
    timerProgressCicle(:counter="timerStore.getShortBreakCounter" :timing="timerStore.shortBreak" :timerNpt="settingsStore.state.shortBreak_npt")
  .wrapper(v-else-if="timerStore.startingLongBreakTimer")
    timerProgressCicle(:counter="timerStore.getLongBreakCounter" :timing="timerStore.longBreak" :timerNpt="settingsStore.state.longBreak_npt")
</template>

<script setup>
import timerProgressCicle from "./progressCicle.vue";
import { useSettingsStore } from "@/stores/settings";
import { useCounterStore } from "@/stores/timer";

const settingsStore = useSettingsStore();
const timerStore = useCounterStore();
</script>
<style scoped>
.timer-container {
  @apply flex justify-center mb-12;
}
</style>
