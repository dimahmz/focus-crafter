<template lang="pug">
.modal-container(@click.self="() => settingsStore.showTasksModal=false")
  .modal
    ModalHeader(:modalName="tasksStore.numberOfTasks" setStore="showTasksModal")
    .tasks-container      
      Task(
        v-for="(task , i) in tasksStore.tasks" 
        :key="i"
        :newTask="task" 
        :ndx="i"
      ) 
    .add-icon(v-show="!tasksStore.addTaskModal")
        addTask(@click="()=> tasksStore.addTaskModal=true")
    .newTask-wrapper
      AddNewTask(v-show="tasksStore.addTaskModal")
</template>

<script setup>
import Task from "./task.vue";
import ModalHeader from "../appSettings/modalHeader.vue";
import addTask from "../_icons/addTask.vue";
import AddNewTask from "./addNewTask.vue";
import closeBtn from "../_icons/close.vue";
import Dots from "../_icons/dots.vue";

import { useTasksStore } from "../../stores/tasks";
import { useSettingsStore } from "../../stores/settings";
import { ref } from "vue";
const tasksStore = useTasksStore();
const settingsStore = useSettingsStore();
</script>

<style scoped>
.modal-container {
  @apply absolute w-screen h-screen p-5;
  z-index: 100;
}
.modal {
  @apply p-4 relative overflow-y-auto;
  height: 90%;
  z-index: 999;
}
.tasks-container {
  @apply relative flex flex-col space-y-3 px-3;
}
.task {
  @apply cursor-pointer;
}
.newTask-wrapper {
  @apply flex justify-center m-10 absolute z-10;
  top: 10%;
}
.add-icon {
  @apply sticky py-3 flex justify-center;
  bottom: 0%;
}
</style>
