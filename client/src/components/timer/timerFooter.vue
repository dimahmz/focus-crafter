<template lang="pug">
.controllers-conatiner 
  .btn-container(v-if="!timerStore.isTimerCounting")
    a-button( @click="start()") start
  .timer-controllers(v-else)
    .change-btns
      .restart-timer(@click="timerStore.restartTimer()")
        retweet-outlined
      .changeBtn(@click="timerStore.pauseOrResumeTimer()")
        play-circle-outlined(v-if="timerStore.pauseTimer")
        pause-circle-outlined(v-else)
      .changeBtn(@click="changeTimer()")
        caret-right-outlined
</template>

<script setup>
import {
  CaretRightOutlined,
  ExclamationCircleOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  RetweetOutlined,
} from "@ant-design/icons-vue";

import { Modal } from "ant-design-vue";
import { createVNode } from "vue";

import { useCounterStore } from "@/stores/timer";

const timerStore = useCounterStore();

//start the timer
function start() {
  if (timerStore.startingPromodoroTimer) timerStore.startPromodoroTimer();
  else if (timerStore.startingShortBreakTimer)
    timerStore.startShortBreakTimer();
  else timerStore.startLongBreakTimer();
}

// change the timer
function changeTimer() {
  timerStore.changeToAnewPhase();
  Modal.confirm({
    title: "Confirm",
    icon: createVNode(ExclamationCircleOutlined),
    content: "are u sure?",
    okText: "yes",
    cancelText: "no",
    onOk() {
      timerStore.needBreakConfirm(true);
    },
    onCancel() {
      timerStore.needBreakConfirm(false);
    },
  });
}
</script>

<style scoped>
.btn-container {
  @apply flex justify-center w-40 space-x-3 mx-auto;
}
.timer-controllers {
  @apply mt-14 grid place-items-center;
}
.controllers-conatiner {
  @apply mb-10;
}
.change-btns {
  @apply flex gap-x-5  items-center;
}

.change-btns * {
  @apply text-lg hover:cursor-pointer transition-all hover:text-pink hover:text-xl;
}
</style>
