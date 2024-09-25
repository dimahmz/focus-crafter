<template lang="pug">
.grid.place-items-center
  .w-full.max-w-lg.bg-slate-300.rounded-md.py-2.px-3
    .title-container
      h1 {{ tasksStore.workingOnTask }}
      p {{ tasksStore.workingOnTaskPomodoros }}
    .times-container
      p {{content.time_spent_working}}
      p {{ tasksStore.tasktotalMinutes }} {{content.min}}
    .times-container
      p {{content.total_time_spent}}
      p {{settingsStore.state.shortBreak_npt}} {{content.min}}
</template>

<script setup>
import { useTasksStore } from "../../stores/tasks";
import { useSettingsStore } from "../../stores/settings";
import content from "@/content/labels.json";

const tasksStore = useTasksStore();
const settingsStore = useSettingsStore();
</script>

<style scoped>
.title-container,
.times-container {
  @apply flex justify-between items-center;
}
</style>
