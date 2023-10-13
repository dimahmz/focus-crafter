<template lang="pug">
.task(
  @click.self='tasksStore.selectTask(ndx)'
  :class='{selectedTask: task.isSelected, finishedTask : task.isFinished}')
  .select-icons
    clock-circle-outlined(
      v-if="task.isSelected & timerStore.isTimerCounting")    
    check-circle-outlined(
      v-else-if="task.isFinished"
      @click="()=>{task.isFinished=false}")
    minus-circle-outlined(
      v-else 
      @click="()=>{task.isFinished=true}")
  h1(
    @click='tasksStore.selectTask(ndx)') {{ task.title }}
  span(
    @click='tasksStore.selectTask(ndx)'
    ) {{task.completedPomodoros}}/{{task.estimatedPomodoros}}
  a-dropdown
    .dots-icon
      more-outlined
    template(#overlay)
      a-menu
        a-menu-item
          span(@click="displayEditTask()") edit task
        a-menu-item
          span(@click="tasksStore.deleteTask(ndx)") clear task
        a-menu-item
          span(@click="displayNotes(true)") task note
.task-note(
  v-show="showNotes")
  p {{task.notes}}
  Compress(@click="displayNotes(false)")

AppModal(v-if="settingsStore.showEditTaskModal" modalStoreSet="showEditTaskModal")
  AddNewTask(:Task="task" :ndx="ndx" updateTask=true)  
</template>

<script setup>
import Clock from "../_icons/clock.vue";
import Compress from "../_icons/compress.vue";
import Dots from "../_icons/dots.vue";
import Selected from "../_icons/selected.vue";
import Unselect from "../_icons/unselect.vue";
import AddNewTask from "./addNewTask.vue";
import EditTask from "./EditTask.vue";
import AppModal from "../appModal.vue";

import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons-vue";

import { ref } from "vue";
import { useTasksStore } from "../../stores/tasks";
import { useSettingsStore } from "../../stores/settings";
import { useCounterStore } from "../../stores/timer";

const settingsStore = useSettingsStore();
const timerStore = useCounterStore();
const tasksStore = useTasksStore();

const props = defineProps({
  task: { type: Object, required: true },
  ndx: { type: Number, required: true },
});

const showNotes = ref(false);
function displayNotes(option) {
  tasksStore.tasks[props.ndx].showEditModal = false;
  showNotes.value = option;
  tasksStore.tasks[props.ndx].displayOptions = false;
}
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
  @apply flex p-2 justify-between bg-app-quaternary  text-white cursor-pointer relative;
}
.task h1 {
  @apply text-white;
}
.selectedTask {
  @apply bg-app-tertiary;
}
.finishedTask {
  @apply line-through;
}

.task-options {
  @apply flex flex-col absolute right-9 top-10  p-3 z-20
  bg-white text-black;
}
</style>
