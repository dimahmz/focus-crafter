<template lang="pug">

</template>

<script setup>
import { createVNode, onMounted, onUnmounted } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { Modal } from "ant-design-vue";
import { useCounterStore } from "@/stores/timer";
import { useSettingsStore } from "../stores/settings";

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  okText: {
    type: String,
    default: "ok",
  },
  cancelText: {
    type: String,
    default: "discard",
  },
  wantsToleavePage: {
    type: Boolean,
    default: false,
  },
});

const modal = Modal.confirm();

onMounted(() => {
  modal.confirm({
    title: props.title,
    icon: createVNode(ExclamationCircleOutlined),
    content: props.content,
    okText: props.okText,
    cancelText: props.cancelText,
  });

  modal.onOk = changeTimerConfirm(true);
  modal.onCancel = changeTimerConfirm(false);
});

onUnmounted(() => modal.destroy());

const timerStore = useCounterStore();

function changeTimerConfirm(confirm) {
  switch (timerStore.timerCountingIs) {
    case "promodoro":
      if (confirm) timerStore.promodoro = 0;
      timerStore.startPromodorotTimer();
      break;
    case "shortBreak":
      if (confirm) timerStore.shortBreak = 0;
      timerStore.startShortBreakTimer();
      break;
    case "longBreak":
      if (confirm) timerStore.longBreak = 0;
      timerStore.startLongBreakTimer();
      break;
  }
  timerStore.needToChange = timerStore.displayModel = false;
}

const settingsStore = useSettingsStore();

function leavePageConfirm(confirm) {
  if (confirm) {
    timerStore.promodoro = settingsStore.promodoro_npt * 60;
    timerStore.shortBreak = settingsStore.shortBreak_npt * 60;
    timerStore.longBreak = settingsStore.longBreak_npt * 60;
  } else changeTimerConfirm(false);
}
</script>

<style scoped>
.model-conatiner {
  @apply m-0 absolute inset-0 h-screen w-full flex justify-center bg-gray-300 opacity-95 overflow-hidden;
  z-index: 100;
}
.model {
  @apply w-56 h-24 border mt-32 bg-gray-500 relative;
}

.message-container {
  @apply text-center;
}
.btns-container {
  @apply flex justify-between;
}
.btn {
  @apply bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer;
}
</style>
