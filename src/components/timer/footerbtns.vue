<template lang="pug">
.btn-container
  seetingIcon
  tasksIcons
</template>

<script setup>
import seetingIcon from "../icons/setting.vue";
import tasksIcons from "../icons/tasks.vue";
import { useCounterStore } from "@/stores/timer";
const store = useCounterStore();
</script>

<style scoped>
.btn-container {
  @apply flex justify-center w-40 space-x-3 mx-auto;
}
</style>
