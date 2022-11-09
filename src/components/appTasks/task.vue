<template lang="pug">
.task(
  @click.self='tasksStore.selectTask(ndx)'
  :class='{selectedTask: newTask.isSelected, finishedTask : newTask.isFinished}')
  .select-icons
    Clock(
      v-if="newTask.isSelected & timerStore.TimerIsCounting")    
    Selected(
      v-else-if="newTask.isFinished"
      @click="()=>{newTask.isFinished=false}")
    Unselect(
      v-else 
      @click="()=>{newTask.isFinished=true}")
  h1(
    @click='tasksStore.selectTask(ndx)') {{ newTask.title }}
  span(
    @click='tasksStore.selectTask(ndx)'
    ) {{newTask.finishedPromdoros}}/{{newTask.estimatedPromodoros}}
  .dots-icon
    Dots(
      @click="diplayOptions()"
      )
  .task-options(v-if="newTask.displayOptions")
    span(@click="displayEditTask()") edit task
    span(@click="tasksStore.deleteTask()") clear task
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
  tasksStore.addTaskModal = false;
  tasksStore.tasks.forEach((task, i) => {
    if (i !== props.ndx) task.displayOptions = false;
  });
  tasksStore.tasks[props.ndx].displayOptions =
    !tasksStore.tasks[props.ndx].displayOptions;
}
function displayEditTask() {
  tasksStore.tasks[props.ndx].displayOptions = false;
  tasksStore.tasks[props.ndx].showEditModal = true;
}
</script>

<style scoped>
.task {
  @apply flex p-2 justify-between bg-blue text-white cursor-pointer relative;
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
