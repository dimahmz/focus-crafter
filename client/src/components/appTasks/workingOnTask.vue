<template lang="pug">
.grid.place-items-center
  .task-container
    .title-container
      h1 {{ tasksStore.workingOnTask }}
      p {{ tasksStore.workingOnTaskPomodoros }}
    .times-container
      p {{ tasksStore.tasktotalMinutes }} min 
      p {{settingsStore.state.shortBreak_npt}} min
</template>

<script setup>
import { useTasksStore } from "../../stores/tasks";
import { useSettingsStore } from "../../stores/settings";
const tasksStore = useTasksStore();
const settingsStore = useSettingsStore();
</script>

<style scoped>
.task-container {
  @apply w-56 bg-slate-300 rounded-md py-2 px-3;
}
.title-container,
.times-container {
  @apply flex justify-between items-center;
}
</style>
