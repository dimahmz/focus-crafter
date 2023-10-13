<template lang="pug">
section
  .flex-center(v-if="!timerStore.isTimerCounting")
    .btn-box.bg-app-tertiary(@click="start()")
      startBtn(w=24 h=29 colors_classes="fill-app-secondary")
  .flex-center(v-else)
    .flex.gap-x-5.items-center
      .btn-box.bg-app-tertiary.bg-app-quaternary(@click="timerStore.restartTimer()")
        restart(w=16 h=16 colors_classes="fill-app-tertiary")
      .btn-box.bg-app-tertiary(@click="timerStore.pauseOrResumeTimer()")
        startBtn(v-if="timerStore.pauseTimer" colors_classes="fill-app-secondary" w=24 h=29 )
        pause(v-else w=24 h=29 colors_classes="fill-app-secondary")
      .btn-box.bg-app-tertiary.bg-app-quaternary(@click="changeTimer()")
        Next(w=16 h=16 colors_classes="fill-app-tertiary")
  WorkingOnTask(v-if="tasksStore.selectedTaskNdx >= 0").mt-8
</template>

<script setup>
import WorkingOnTask from "../appTasks/workingOnTask.vue";
import startBtn from "../_icons/start.vue";
import restart from "../_icons/restart.vue";
import pause from "../_icons/pause.vue";
import Next from "../_icons/next.vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { Modal } from "ant-design-vue";
import { createVNode } from "vue";
import { useCounterStore } from "@/stores/timer";
import { useTasksStore } from "@/stores/tasks";

const tasksStore = useTasksStore();
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
.btn-box {
  @apply rounded-2xl flex-center p-5 cursor-pointer;
}
</style>
