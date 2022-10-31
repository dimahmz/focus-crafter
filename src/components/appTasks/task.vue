<template lang="pug">
.task(
  @click.self='selectThisTask(ndx)'
  :class='{ selectedTask : newTask.isSelected }' 
)
  span(@click='selectThisTask(ndx)' ) {{ ndx }}
  h1(@click='selectThisTask(ndx)' ) {{ newTask.title }}
  span(@click='selectThisTask(ndx)' ) {{newTask.finishedPromdoros}}/{{newTask.estimatedPromodoros}}
  .dots-icon
    Dots(@click="editTask(ndx)" )
  .note-icon
    tasks(@click="displayNotes(ndx)")
.task-note(v-show="showNotes")
  p {{newTask.notes}}
EditTask(
  v-show="tasksStore.tasks.value[ndx].showEditModal" :thisTask="newTask" :ndx="ndx"
)       
</template>

<script setup>
import Dots from "../_icons/dots.vue";
import AddNewTask from "./addNewTask.vue";
import EditTask from "./EditTask.vue";
import tasks from "../_icons/tasks.vue";

import { ref } from "vue";
import { useTasksStore } from "../../stores/tasks";
import { useSettingsStore } from "../../stores/settings";

const settingsStore = useSettingsStore();

defineProps({
  newTask: { type: Object, required: true },
  ndx: { type: Number, required: true },
});

const tasksStore = useTasksStore();
const showNotes = ref(false);

function displayNotes(ndx) {
  tasksStore.tasks.value[ndx].showEditModal = false;
  showNotes.value = !showNotes.value;
}
function editTask(ndx) {
  showNotes.value = false;
  tasksStore.tasks.value[ndx].showEditModal =
    !tasksStore.tasks.value[ndx].showEditModal;
}
function selectThisTask(ndx) {
  tasksStore.selectTask(ndx);
}
</script>

<style scoped>
.task {
  @apply flex p-2 justify-between bg-blue text-white cursor-pointer relative;
}
.selectedTask {
  @apply bg-pink;
}
</style>
