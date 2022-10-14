<template lang="pug">
.btn-container
  seetingIcon
  tasksIcons
</template>

<script setup>
import seetingIcon from "../_icons/setting.vue";
import tasksIcons from "../_icons/tasks.vue";
import { useCounterStore } from "@/stores/timer";
const store = useCounterStore();
</script>

<style scoped>
.btn-container {
  @apply flex justify-center w-40 space-x-3 mx-auto;
}
</style>
