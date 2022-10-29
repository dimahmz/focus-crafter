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
    .flex.justify-center.m-10
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
.tasks-container {
  @apply flex flex-col space-y-3 px-3;
}
.task {
  @apply cursor-pointer;
}

.add-icon {
  @apply py-3 flex justify-center;
}
</style>
