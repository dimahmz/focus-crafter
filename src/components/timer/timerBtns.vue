<template lang="pug">
.timer-state-container
  .wrapper(v-if="store.startPromodoro")
    roundedBtn(:counter="store.promodoro")
  .wrapper(v-else-if="store.startShortBreak") 
    roundedBtn(:counter="store.shortBreak")
  .wrapper(v-else-if="store.startLongBreak")
    roundedBtn(:counter="store.longBreak")
</template>

<script setup>
import roundedBtn from "./roundedBtn.vue";
import { useCounterStore } from "@/stores/timer";
const store = useCounterStore();
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
