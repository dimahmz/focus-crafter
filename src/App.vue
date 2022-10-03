<template lang="pug">
main
h1.title ProFocus
TimerBtns
.model-conatiner(v-if="store.displayModel")
  WarningModel
</template>

<script setup>
import WarningModel from "./components/timer.vue/warningModel.vue";
import TimerBtns from "./components/timer.vue/timerBtns.vue";
import { useCounterStore } from "@/stores/timer";
const store = useCounterStore();
</script>

<style>
.title {
  @apply text-center;
}
.model-conatiner {
  @apply absolute inset-0 h-screen w-full flex justify-center pt-20 bg-gray-100 opacity-95;
}
.model {
  @apply relative z-30;
}
</style>
