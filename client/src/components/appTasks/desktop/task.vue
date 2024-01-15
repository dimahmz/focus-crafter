<template lang="pug">
.task(
  @click.self='tasksStore.selectTask(ndx)'
  :class='{selectedTask: task.isSelected, finishedTask : task.isFinished}')
  .flex.justify-between.mb-2
    .text-app-title.font-semibold 
      span.mr-1
        v-icon(v-if="task.isSelected" icon="mdi-record-circle-outline")
        v-icon(v-else icon="mdi-circle-outline")
      span {{ task.title }}
  .flex.justify-between.px-2
    span {{task.finishedPomodoros}} / {{task.estimatedPomodoros}}
    v-icon(icon="mdi-delete" @click.self='tasksStore.deleteTask(ndx)')
  .text-center(v-if="task.finishedPomodoros>= task.estimatedPomodoros")
    v-icon(icon="mdi-check") 
    span Completed
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
  @apply p-3 bg-app-quaternary cursor-pointer rounded-md;
}
</style>
