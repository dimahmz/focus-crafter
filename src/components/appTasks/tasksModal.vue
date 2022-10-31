<template lang="pug">
.modal-container
  .modal
    ModalHeader(modalName=`Tasks ${tasksNmbr}` setStore="showTasksModal")
    .tasks-container      
      Task(
        v-for="(task , i) in tasksStore.tasks.value" 
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
import { useTasksStore } from "../../stores/tasks";
const tasksStore = useTasksStore();
const tasksNmbr = tasksStore.numberOfTasks;
</script>

<style scoped>
.modal-container {
  @apply absolute w-screen h-screen overflow-hidden;
}
.modal {
  @apply p-4 relative overflow-y-auto;
  height: 90%;
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
