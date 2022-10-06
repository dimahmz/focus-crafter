<template lang="pug">
.model-conatiner(v-if="store.displayModel")
  .model
    .message-container are u sure?
    .btns-container
      .btn(@click="store.needBreakConfirm(true)") yes
      .btn(@click="store.needBreakConfirm(false)") no
</template>

<script setup>
import { useCounterStore } from "@/stores/timer";
const store = useCounterStore();
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
