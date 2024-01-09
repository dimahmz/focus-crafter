<template lang="pug">
.task(
  :class='{selectedTask: task.isSelected, finishedTask : task.isFinished}')
  .flex.justify-between.mb-2
    .text-app-title.font-semibold 
      span.mr-1
        v-icon(v-if="task.isSelected" icon="mdi-record-circle-outline")
        v-icon(v-else icon="mdi-circle-outline")
      span {{ task.title }}
    span {{task.finishedPomodoros}} / {{task.estimatedPomodoros}}
  .text-app-parag.my-1 Spent time : 1h : 30 min
  .flex.justify-end
    v-icon(icon="mdi-delete" @click='tasksStore.deleteTask(ndx)')
  </template>

<script setup>
import { ref } from "vue";
import { useTasksStore } from "@/stores/tasks";
import { useSettingsStore } from "@/stores/settings";
import { useCounterStore } from "@/stores/timer";

const settingsStore = useSettingsStore();
const timerStore = useCounterStore();
const tasksStore = useTasksStore();

const props = defineProps({
  task: { type: Object, required: true },
  ndx: { type: Number, required: true },
});

function diplayOptions() {
  tasksStore.hideAll();
  tasksStore.tasks[props.ndx].displayOptions = true;
}
function displayEditTask() {
  settingsStore.showEditTaskModal = true;
}
</script>

<style scoped>
.task {
  @apply p-2 text-sm bg-app-quaternary cursor-pointer rounded-md;
}
</style>
