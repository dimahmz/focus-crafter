<template lang="pug">
.circle-bg
  a-progress(type="circle" :percent="progress")
    template(#format="percent")
      .counter {{counter }}
  .roundedBtn(v-if="!timerStore.TimerIsCounting")
    a-button( @click="start()") start
  .control-timer(v-if="timerStore.TimerIsCounting")
    .change-btns
      .restart-timer(@click="timerStore.restartTimer()")
        retweet-outlined
      .changeBtn(@click="timerStore.pauseOrResumeTimer()")
        play-circle-outlined(v-if="timerStore.pauseTimer")
        pause-circle-outlined(v-else)
      .changeBtn(@click="forceChange()")
        caret-right-outlined
</template>
<script setup>
import { useCounterStore } from "@/stores/timer";
import { watch, onMounted, ref, createVNode } from "vue";
import { CaretRightOutlined, ExclamationCircleOutlined,PauseCircleOutlined , PlayCircleOutlined , RetweetOutlined} from "@ant-design/icons-vue";
import { Modal } from "ant-design-vue";
const timerStore = useCounterStore();

const props = defineProps({
  counter: { type: String, required: true },
  timing: { type: Number, required: true },
  timerNpt: { type: Number, required: true },
});

const progress = ref(0);

watch(props, () => {
  progress.value = 100 - ( props.timing / (props.timerNpt * 60) ) * 100;
});

function start() {
  if (timerStore.startPromodoro) timerStore.startPromodorotTimer();
  else if (timerStore.startShortBreak) timerStore.startShortBreakTimer();
  else timerStore.startLongBreakTimer();
}

function forceChange() {
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

<style scoped>*
.circle-bg{
  @apply text-white;
}
.changeBtn{
  @apply text-white;
}
.roundedBtn {
  @apply cursor-pointer flex justify-center m-5;
}
.roundedBtn:hover {
  @apply transition-all ease-out scale-110;
}
.control-timer{
  @apply  flex flex-col justify-center items-center cursor-pointer text-white;
}
.change-btns {
  @apply text-white flex justify-center items-center cursor-pointer space-x-4 m-4;
}
</style>
