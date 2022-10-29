<template lang="pug">
.btn-container
  seetingIcon(@click='()=>settingsStore.showSettingsModal=true')
  tasksIcons(@click='()=>settingsStore.showTasksModal=true')
</template>

<script setup>
import seetingIcon from "../_icons/setting.vue";
import tasksIcons from "../_icons/tasks.vue";
import { useCounterStore } from "@/stores/timer";
import { useSettingsStore } from "@/stores/settings";
const settingsStore = useSettingsStore();
const store = useCounterStore();
</script>

<style scoped>
.btn-container {
  @apply flex justify-center w-40 space-x-3 mx-auto;
}
</style>
