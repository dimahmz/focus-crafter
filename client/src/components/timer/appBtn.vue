<template lang="pug">
button.btn(@click="sendConfirm(confirm)") {{btnName}}
</template>

<script setup>
import { useCounterStore } from "@/stores/timer";
defineProps({
  btnName: { type: String, required: true },
  confirm: { type: Boolean, required: true },
});
const store = useCounterStore();
</script>

<style>
.btn {
  @apply bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer;
}
</style>
