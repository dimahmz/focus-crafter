<template lang="pug">
.timer
  .task-wrapper.text-white.text-center(v-if="tasksStore.tasks.length")
    h1 {{tasksStore.workingOnTask}}
    h2 # {{tasksStore.workingOnTaskPromodoros}}
  .timer-state-container
    .wrapper(v-if="timerStore.startPromodoro")
      roundedBtn(:counter="timerStore.getPromodorocounter" :timing="timerStore.promodoro" :timerNpt="settingsStore.state.promodoro_npt")
    .wrapper(v-else-if="timerStore.startShortBreak") 
      roundedBtn(:counter="timerStore.getShortBreakcounter" :timing="timerStore.shortBreak" :timerNpt="settingsStore.state.shortBreak_npt")
    .wrapper(v-else-if="timerStore.startLongBreak")
      roundedBtn(:counter="timerStore.getLongBreakcounter" :timing="timerStore.longBreak" :timerNpt="settingsStore.state.longBreak_npt")
</template>

<script setup>
import roundedBtn from "./roundedBtn.vue";
import { useCounterStore } from "@/stores/timer";
import { useTasksStore } from "@/stores/tasks";
import { useSettingsStore } from "@/stores/settings";
const timerStore = useCounterStore();
const tasksStore = useTasksStore();
const settingsStore=useSettingsStore();

</script>
<style scoped>
.btns-conatiner {
  @apply inline-block mx-auto px-1 gap-x-3 rounded-3xl bg-blue text-white;
}
button.btn {
  @apply m-2 px-2.5 py-1.5 rounded-3xl shadow;
}

.activeTimer {
  @apply bg-pink;
}
.promodorsCount {
  @apply flex justify-end my-3 text-white;
}

.timer-state-container {
  @apply flex justify-center;
}
</style>
