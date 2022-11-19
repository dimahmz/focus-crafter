<template lang="pug">
.circle-bg
  .circle-wrap
    .circle
      .mask.full(data-id="progressBar")
        .fill(data-id="progressBar")
      .mask.half
        .fill(data-id="progressBar")
      .inside-circle
        .counter {{counter }}
        .roundedBtn(v-if="!store.TimerIsCounting" @click="start()") start
  .contol-timer(v-if="store.TimerIsCounting")
    .changeBtn(@click="store.pauseOrResumeTimer()")  {{ store.getTimerState}}
    .changeBtn(@click="store.changeToAnewPhase()")  &gt;
    p(@click="store.restartTimer()") restart
</template>
<!-- style.transform = "rotate(7deg)"; -->
<script setup>
import { useCounterStore } from "@/stores/timer";
import { watch, onMounted,ref } from "vue";

const store = useCounterStore();

const props = defineProps({
  counter: { type: String, required: true },
  timing: { type: Number, required: true },
  timerNpt: { type: Number, required: true },
});

onMounted(() => {});


const progress=ref(0);   

watch(props, () => {
  progress.value = 180 - parseInt((180 * props.timing) / (props.timerNpt * 60));
  progress.value=`rotate(${progress.value}deg)`;
});

function start() {
  if (store.startPromodoro) store.startPromodorotTimer();
  else if (store.startShortBreak) store.startShortBreakTimer();
  else store.startLongBreakTimer();
}
</script>

<style scoped>
.circle-wrap {
  @apply text-white;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid #cdcbd0;
}
.circle-wrap .circle .mask,
.circle-wrap .circle .fill {
  width: 150px;
  height: 150px;
  position: absolute;
  border-radius: 50%;
}

.circle-wrap .circle .mask {
  clip: rect(0px, 150px, 150px, 75px);
}

.circle-wrap .inside-circle {
  @apply bg-blue;
  width: 122px;
  height: 122px;
  border-radius: 50%;
  text-align: center;
  margin-top: 14px;
  margin-left: 14px;
  position: absolute;
  z-index: 99;
  font-weight: 700;
  font-size: 2em;
}

.mask .fill {
  @apply bg-pink;
  clip: rect(0px, 75px, 150px, 0px);
}

.mask.full,
.circle .fill {
  transform: v-bind(progress);
  transition: all 0.5s ease-in-out;
}
.roundedBtn {
  @apply cursor-pointer;
}
.roundedBtn:hover {
  @apply transition-all ease-out scale-110;
}

.contol-timer {
  @apply text-white grid place-items-center cursor-pointer;
}
</style>
