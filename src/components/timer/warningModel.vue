<template lang="pug">

</template>

<script setup>
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { createVNode, onMounted, onUnmounted } from "vue";
import { useCounterStore } from "@/stores/timer";
import { Modal } from "ant-design-vue";

const store = useCounterStore();

function needBreakConfirm(confirm) {
  switch (store.timerCountingIs) {
    case "promodoro":
      if (confirm) store.promodoro = 0;
      store.startPromodorotTimer();
      break;
    case "shortBreak":
      if (confirm) store.shortBreak = 0;
      store.startShortBreakTimer();
      break;
    case "longBreak":
      if (confirm) store.longBreak = 0;
      store.startLongBreakTimer();
      break;
  }
  store.needToChange = store.displayModel = false;
}
const modal = Modal.confirm();

onMounted(() => {
  modal.confirm({
    title: "Confirm",
    icon: createVNode(ExclamationCircleOutlined),
    content: "are u sure?",
    okText: "yes",
    cancelText: "no",
  });

  modal.onOk = needBreakConfirm(true);
  modal.onCancel = needBreakConfirm(false);
});

onUnmounted(() => modal.destroy());
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
