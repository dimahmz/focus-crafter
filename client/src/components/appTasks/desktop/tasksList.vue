<template lang="pug">
.tasks-container.py-4.relative.flex-column.space-y-5(class="max-w-[400px]")
  .text-xl(v-if="tasksStore.tasks.length==0") {{content.no_task}}
  Task(
    v-for="(task , i) in tasksStore.tasks" 
    :key="i"
    :task="task" 
    :ndx="i"
  )
  .btn-container    
    v-btn.mr-0(@click="()=>addNewTaskModal=true") {{content.add_task}}
</template>

<script setup>
import Task from "../task.vue";
import ModalHeader from "@/components/appSettings/modalHeader.vue";
import AppBtn from "@/components/appBtns/appBtn.vue";
import AddTask from "@/components/appTasks/addTask.vue";

import { useTasksStore } from "@/stores/tasks";
import { useSettingsStore } from "@/stores/settings";
import { computed } from "vue";
import { storeToRefs } from "pinia";
import content from "@/content/labels.json"


const { addNewTaskModal } = storeToRefs(useTasksStore());

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
function closeModal() {
  settingsStore.showTasksModal = false;
}

function showNewTaskModal() {
  settingsStore.showtaskListMobile = true;
  // settingsStore.showTasksModal = false;
}
</script>

<style lang="scss" scoped>
.modal {
  @apply overflow-y-auto relative;
  height: 90%;
}
.tasks-container {
  @apply relative flex flex-col space-y-3 px-3;
  .btn-container {
    @apply sticky bottom-0 flex-center;
    .v-btn {
      @apply bg-app-tertiary px-8 my-8 text-app-primary z-[100];
    }
  }
}
.task {
  @apply cursor-pointer;
}
.add-icon {
  @apply sticky py-3 w-10 mx-auto;
  bottom: 0%;
}
.icon {
  @apply relative;
}
</style>
