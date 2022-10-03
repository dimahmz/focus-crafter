<template lang="pug">
.model 
  .message-container are u sure?
  .btns-container
    .btn(@click="store.needBreakConfirm(true)") yes
    .btn(@click="store.needBreakConfirm(false)") no
</template>

<script setup>
import { useCounterStore } from "@/stores/timer";
const store = useCounterStore();
// const unsubscribe=store.$onAction(()=>{

// })
</script>

<style>
.model {
  @apply w-56 h-24 border bg-gray-300;
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
