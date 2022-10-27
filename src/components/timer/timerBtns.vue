<template lang="pug">
.timer-state-container
  .wrapper(v-if="timerStore.startPromodoro")
    roundedBtn(:counter="timerStore.getPromodorocounter")
  .wrapper(v-else-if="timerStore.startShortBreak") 
    roundedBtn(:counter="timerStore.gethortBreakcounter")
  .wrapper(v-else-if="timerStore.startLongBreak")
    roundedBtn(:counter="timerStore.getLongBreakcounter")
</template>

<script setup>
import roundedBtn from "./roundedBtn.vue";
import { useCounterStore } from "@/stores/timer";
const timerStore = useCounterStore();
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
