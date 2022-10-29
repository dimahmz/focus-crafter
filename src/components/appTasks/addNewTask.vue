<template lang="pug">
.edit-task
  .task-header
    input(v-model="newTaskName")
    .grid.place-items-center
      closeBtn(@click="closeModal")
  .promodoros
    h1 promodoros 
    .promodors-btns
      input(type="number" min="1" v-model="estimatedPromo")
  .notes-conatiner
    textarea(cols="30" rows="4" v-model="newTaskNote" placeholder="add notes")
  .edit-task-footer
    .other-btns
      button(@click="closeModal")  Cancel
      button(@click="saveNewTask") add

  </template>

<script setup>
import closeBtn from "../_icons/close.vue";
import { useTasksStore } from "../../stores/tasks";
import { useSettingsStore } from "../../stores/settings";
import { ref } from "vue";
const tasksStore = useTasksStore();
const settingsStore = useSettingsStore();
const props = defineProps({
  thisTask: {
    type: Object,
    default: {
      title: "",
      notes: "",
      estimatedPromodoros: 4,
      finishedPromdoros: 0,
    },
  },
});
const newTaskName = ref(props.thisTask.title),
  newTaskNote = ref(props.thisTask.notes),
  finishedPromo = ref(props.thisTask.finishedPromdoros),
  estimatedPromo = ref(props.thisTask.estimatedPromodoros);

function saveNewTask() {
  tasksStore.addTask({
    title: newTaskName.value,
    notes: newTaskNote.value,
    estimatedPromodoros: estimatedPromo.value,
    finishedPromdoros: finishedPromo.value,
  });
  tasksStore.addTaskModal = false;
}

function closeModal() {
  tasksStore.addTaskModal = false;
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
  @apply flex justify-end;
}
</style>
