<template lang="pug">
.container
  h1.title ProFocus
  .btns(v-show="!timer.TimerIsCounting").grid.place-items-center
    .btns-conatiner
      button.btn(:class="{ activeTimer: timer.startPromodoro }" @click="timer.goToPromodoro()") promodoro
      button.btn(:class="{ activeTimer: timer.startShortBreak }" @click="timer.getAshortBreak()") short break
      button.btn(:class="{ activeTimer: timer.startLongBreak }" @click="timer.getAlongBreak()") long break
  .promodorsCount(v-if="tasksStore.tasks.length===0")
    button.btn.bg-pink {{timer.finishedPromodoros}}
</template>

<script setup>
import { useCounterStore } from "@/stores/timer";
import { useTasksStore } from "@/stores/tasks";
const timer = useCounterStore();
const tasksStore = useTasksStore();

</script>

<style scoped>
.title {
  @apply text-center text-6xl font-semibold text-white mb-7;
}
.btns-conatiner {
  @apply inline-block mx-auto px-1 gap-x-3 rounded-3xl text-white;
}
button.btn {
  @apply m-2 px-2.5 py-1.5 rounded-3xl shadow;
}
/* .activeTimer {
  @apply bg-pink;
} */
.promodorsCount {
  @apply flex justify-end text-white;
}
</style>
