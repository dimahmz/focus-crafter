<template lang="pug">
.edit-task
  .task-header
    input(v-model="editedTaskName")
    .grid.place-items-center
      closeBtn(@click="closeModal")
  .promodoros
    h1 promodoros 
    .promodors-btns
      input(type="number" min="1" v-model="estimatedPromo")
  .notes-conatiner
    textarea(cols="30" rows="4" v-model="editedTaskNote" placeholder="add notes")
  .edit-task-footer
    .delete-btn
      button(@click="deleteTask") Delete
    .other-btns
      button(@click="closeModal")  Cancel
      button(@click="savechangedTask") saveChanges()
    </template>

<script setup>
import closeBtn from "../_icons/close.vue";
import { useTasksStore } from "../../stores/tasks";
import { useSettingsStore } from "../../stores/settings";
import { ref } from "vue";
const tasksStore = useTasksStore();
const settingsStore = useSettingsStore();
const props = defineProps({
  ndx: {
    type: Number,
    required: true,
  },
  thisTask: {
    type: Object,
    required: true,
  },
});
const editedTaskName = ref(props.thisTask.title),
  editedTaskNote = ref(props.thisTask.notes),
  finishedPromo = ref(props.thisTask.finishedPromdoros),
  estimatedPromo = ref(props.thisTask.estimatedPromodoros);

function savechangedTask() {
  tasksStore.editTask(props.ndx, {
    title: editedTaskName.value,
    notes: editedTaskNote.value,
    estimatedPromodoros: estimatedPromo.value,
    finishedPromdoros: finishedPromo.value,
  });
}

function closeModal() {
  tasksStore.tasks.value[props.ndx].showEditModal = false;
}
function deleteTask() {
  tasksStore.deleteTask(props.ndx);
}
</script>
<style scoped>
.edit-task {
  @apply bg-slate-300;
}
.task-header {
  @apply flex justify-between;
}
.promodoros {
  @apply flex justify-center space-x-6;
}
.task {
  @apply flex p-2 justify-between bg-blue text-white;
}
.edit-task-footer {
  @apply flex justify-between;
}
</style>
