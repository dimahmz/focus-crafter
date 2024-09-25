<template lang="pug">
.task(
  @click='selectTask'
  :class='{selectedTask: task.isSelected, finishedTask : task.isFinished}')
  .flex.justify-between.mb-2
    .text-app-title.font-semibold
      span.mr-1
        v-icon(v-if="task.isSelected" icon="mdi-record-circle-outline")
        v-icon(v-else icon="mdi-circle-outline")
      span {{ task.title }}
  .flex.justify-between.px-2
    span {{task.finishedPomodoros}} / {{task.estimatedPomodoros}}
    span(ref="deleteBtn" class="p-0.5" @click.stop="tasksStore.deleteTask(ndx)")
      DeleteIcon(ref="deleteTaslIcon")
  .text-center(v-if="task.finishedPomodoros>= task.estimatedPomodoros")
    v-icon(icon="mdi-check") 
    span {{content.completed}}
</template>

<script setup>
import { ref } from "vue";
import { useTasksStore } from "@/stores/tasks";
import { useSettingsStore } from "@/stores/settings";
import { useCounterStore } from "@/stores/timer";
import DeleteIcon from "@/components/_icons/delete.vue";
const settingsStore = useSettingsStore();
const timerStore = useCounterStore();
const tasksStore = useTasksStore();

const deleteBtn = ref("");
const deleteTaslIcon = ref("");

const props = defineProps({
  task: { type: Object, required: true },
  ndx: { type: Number, required: true },
});

function selectTask(e) {
  tasksStore.selectTask(props.ndx);
}
</script>

<style scoped>
.task {
  @apply p-3 bg-app-quaternary cursor-pointer rounded-md;
}
</style>
