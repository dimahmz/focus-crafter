<template lang="pug">
.btn-conatiner(v-if="!store.TimerIsCounting")
  button.btn(:class="{ activeTimer: store.startPromodoro }" @click="store.goToPromodoro()") promodoro
  button.btn(:class="{ activeTimer: store.startShortBreak }" @click="store.getAshortBreak()") short break
  button.btn(:class="{ activeTimer: store.startLongBreak }" @click="store.getAlongBreak(), store.needLongBreak=true") long break
  button.btn {{store.finishedPromodoros}}/ {{store.todoPromodoros}}
.timer-state-container
  .wrapper(v-if="store.startPromodoro")
    .counter {{store.promodoro}}
    .btn(v-if="store.TimerIsCounting" @click="store.changeToAnewPhase()") &gt;
    .btn(v-else @click="store.startPromodorotTimer()") start
  .wrapper(v-else-if="store.startShortBreak") 
    .counter {{store.shortBreak}}
    .btn(v-if="store.TimerIsCounting" @click="store.changeToAnewPhase()") &gt;
    .btn(v-else @click="store.startShortBreakTimer()") start
  .wrapper(v-else-if="store.startLongBreak")
    .counter {{store.longBreak}}
    .btn(v-if="store.TimerIsCounting" @click="store.changeToAnewPhase()") &gt;
    .btn(v-else @click="store.startLongBreakTimer()") start
</template>

<script setup>
import { useCounterStore } from "@/stores/timer";
const store = useCounterStore();
</script>
<style>
.btn-conatiner,
.timer-state-container {
  @apply flex justify-center my-6;
}
.btn {
  @apply bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow;
}

.activeTimer {
  @apply bg-red-200;
}
</style>
