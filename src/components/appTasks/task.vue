<template lang="pug">
.task(
  @click='selectThisTask(ndx)'
  :class='{ selectedTask : newTask.isSelected }' 
)
  span {{ ndx }}
  h1 {{ newTask.title }}
  span {{newTask.finishedPromdoros}}/{{newTask.estimatedPromodoros}}
  .dots-icon
    Dots(@click="editTask(ndx)")
EditTask(
  v-show="tasksStore.tasks.value[ndx].showEditModal"               :thisTask="newTask"
  :ndx="ndx"
)       
</template>

<script setup>
import Dots from "../_icons/dots.vue";
import AddNewTask from "./addNewTask.vue";
import EditTask from "./EditTask.vue";

import { useTasksStore } from "../../stores/tasks";
import { useSettingsStore } from "../../stores/settings";

const settingsStore = useSettingsStore();

defineProps({
  newTask: { type: Object, required: true },
  ndx: { type: Number, required: true },
});

const tasksStore = useTasksStore();

function editTask(ndx) {
  tasksStore.tasks.value[ndx].showEditModal = true;
}
function selectThisTask(ndx) {
  tasksStore.selectTask(ndx);
}
</script>

<style scoped>
.task {
  @apply flex p-2 justify-between bg-blue text-white cursor-pointer;
}
.selectedTask {
  @apply bg-pink;
}
</style>
