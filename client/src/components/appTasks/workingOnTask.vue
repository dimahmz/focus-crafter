<template lang="pug">
.grid.place-items-center
  .w-full.max-w-lg.bg-slate-300.rounded-md.py-2.px-3
    .title-container
      h1 {{ tasksStore.workingOnTask }}
      p {{ tasksStore.workingOnTaskPomodoros }}
    .times-container
      p Time spent working on this task
      p {{ tasksStore.tasktotalMinutes }} min 
    .times-container
      p Total time spend on breaks
      p {{settingsStore.state.shortBreak_npt}} min
</template>

<script setup>
import { useTasksStore } from "../../stores/tasks";
import { useSettingsStore } from "../../stores/settings";
const tasksStore = useTasksStore();
const settingsStore = useSettingsStore();
</script>

<style scoped>
.title-container,
.times-container {
  @apply flex justify-between items-center;
}
</style>
