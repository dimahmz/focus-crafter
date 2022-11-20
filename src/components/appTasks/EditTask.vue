<template lang="pug">
.edit-task
  .task-header
  a-input(v-model:value="editedTaskName")
    .grid.place-items-center
      closeBtn(@click="()=> tasksStore.tasks[props.ndx].showEditModal = false")
  .promodoros
    h1 promodoros 
    .promodors-btns
      a-input-number(v-model:value="estimatedPromo" :min="1")
  .notes-conatiner
    a-textarea(v-model:value="editedTaskNote" placeholder="add notes" :rows=4)
  .edit-task-footer
    .delete-btn
      a-button(type="primary" @click="()=> tasksStore.deleteTask(ndx)") Delete
    .other-btns
      a-button(type="primary" @click="()=> tasksStore.tasks[props.ndx].showEditModal = false") Cancel
      a-button(type="primary" @click="savechangedTask") Save
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
