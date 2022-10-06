<template lang="pug">
.container
  h1.title ProFocus
  .btns(v-show="!store.TimerIsCounting").grid.place-items-center
    .btns-conatiner
      button.btn(:class="{ activeTimer: store.startPromodoro }" @click="store.goToPromodoro()") promodoro
      button.btn(:class="{ activeTimer: store.startShortBreak }" @click="store.getAshortBreak()") short break
      button.btn(:class="{ activeTimer: store.startLongBreak }" @click="store.getAlongBreak()") long break
  .promodorsCount
    button.btn.bg-pink {{store.finishedPromodoros}} / {{store.todoPromodoros}}
</template>

<script setup>
import { useCounterStore } from "@/stores/timer";
const store = useCounterStore();
</script>

<style scoped>
.title {
  @apply text-center text-6xl font-semibold text-white mb-7;
}
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
  @apply flex justify-end text-white;
}
</style>
