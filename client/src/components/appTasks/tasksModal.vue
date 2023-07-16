<template lang="pug">
a-modal(v-model:visible="settingsStore.showTasksModal" :title="modalTitle")
  div(@click.self="hideSubModals")
    .tasks-container      
      Task(
        v-for="(task , i) in tasksStore.tasks" 
        :key="i"
        :newTask="task" 
        :ndx="i"
      ) 
    .add-icon(v-show="!tasksStore.addNewTaskModal && !tasksStore.editTaskModal")
      plus-circle-filled(@click="()=> tasksStore.addNewTaskModal=true")
    .newTask-wrapper
      AddNewTask(v-show="tasksStore.addNewTaskModal")
  template(#footer)
    a-button(@click="saveTasks()") ok
</template>

<script setup>
import Task from "./task.vue";
import ModalHeader from "../appSettings/modalHeader.vue";
import addTask from "../_icons/addTask.vue";
import AddNewTask from "./addNewTask.vue";

import { useTasksStore } from "../../stores/tasks";
import { useSettingsStore } from "../../stores/settings";
import { PlusCircleFilled } from "@ant-design/icons-vue";
import { computed } from "vue";

const tasksStore = useTasksStore();
const settingsStore = useSettingsStore();

const modalTitle = computed(() => {
  if (tasksStore.numberOfTasks == 0) return "No Task!";
  if (tasksStore.numberOfTasks == 1) return "You have one task.";
  return `You have ${tasksStore.numberOfTasks} tasks.`;
});

function hideSubModals() {
  //hide add a new task modal
  tasksStore.addTaskModal = false;
  //hide edit a task modal
  for (let task of tasksStore.tasks) {
    if (task.displayOptions) {
      task.displayOptions = false;
      return;
    }
  }
}

function saveTasks() {
  settingsStore.showTasksModal = false;
}
</script>

<style scoped>
.modal {
  @apply overflow-y-auto relative;
  height: 90%;
}
.tasks-container {
  @apply relative flex flex-col space-y-3 px-3;
}
.task {
  @apply cursor-pointer;
}
.newTask-wrapper {
  @apply absolute z-10;
  top: 20%;
  z-index: 600;
}
.add-icon {
  @apply sticky py-3 w-10 mx-auto;
  bottom: 0%;
}
.icon {
  @apply relative;
}
</style>
