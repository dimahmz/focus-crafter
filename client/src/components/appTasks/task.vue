<template lang="pug">
.task(
  @click.self='tasksStore.selectTask(ndx)'
  :class='{selectedTask: newTask.isSelected, finishedTask : newTask.isFinished}')
  .select-icons
    clock-circle-outlined(
      v-if="newTask.isSelected & timerStore.TimerIsCounting")    
    check-circle-outlined(
      v-else-if="newTask.isFinished"
      @click="()=>{newTask.isFinished=false}")
    minus-circle-outlined(
      v-else 
      @click="()=>{newTask.isFinished=true}")
  h1(
    @click='tasksStore.selectTask(ndx)') {{ newTask.title }}
  span(
    @click='tasksStore.selectTask(ndx)'
    ) {{newTask.finishedPromdoros}}/{{newTask.estimatedPromodoros}}
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
  p {{newTask.notes}}
  Compress(@click="displayNotes(false)")

EditTask(
  v-show="tasksStore.tasks[ndx].showEditModal" 
  :thisTask="newTask" 
  :ndx="ndx")       
</template>

<script setup>
import Clock from "../_icons/clock.vue";
import Compress from "../_icons/compress.vue";
import Dots from "../_icons/dots.vue";
import Selected from "../_icons/selected.vue";
import Unselect from "../_icons/unselect.vue";
import AddNewTask from "./addNewTask.vue";
import EditTask from "./EditTask.vue";

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
  newTask: { type: Object, required: true },
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
  tasksStore.editTaskModal = true;
  tasksStore.hideAll();
  tasksStore.tasks[props.ndx].showEditModal = true;
}
</script>

<style scoped>
.task {
  @apply flex p-2 justify-between bg-blue text-white cursor-pointer relative;
}
.task h1 {
  @apply text-white;
}
.selectedTask {
  @apply bg-pink;
}
.finishedTask {
  @apply line-through;
}

.task-options {
  @apply flex flex-col absolute right-9 top-10  p-3 z-20
  bg-white text-black;
}
</style>
