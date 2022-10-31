<template lang="pug">
.edit-task
  .task-header
    input( ref="npt" v-model="newTaskName" placeholder="what are you working on?")
    .grid.place-items-center
      closeBtn(@click="closeModal")
  .promodoros
    h1 promodoros 
    .promodors-btns
      button(@click="decrement")   -
      input(type="number" min="1" v-model="estimatedPromo" )
      button(@click="()=>estimatedPromo++")  +
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
import { ref, onMounted } from "vue";

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

const npt = ref(null);
onMounted(() => {
  npt.value.focus();
});

const newTaskName = ref(props.thisTask.title),
  newTaskNote = ref(props.thisTask.notes),
  finishedPromo = ref(props.thisTask.finishedPromdoros),
  estimatedPromo = ref(props.thisTask.estimatedPromodoros);

function saveNewTask() {
  if (newTaskName.value.length === 0) {
    npt.value.classList.add("invalid-npt");
    return;
  }
  tasksStore.addTask({
    title: newTaskName.value,
    notes: newTaskNote.value,
    estimatedPromodoros: estimatedPromo.value,
    finishedPromdoros: finishedPromo.value,
  });
  npt.value.classList.remove("invalid-npt");
  npt.value.focus();
  newTaskName.value = newTaskNote.value = "";
  estimatedPromo.value = 4;
}

function closeModal() {
  tasksStore.addTaskModal = false;
}
function decrement() {
  if (estimatedPromo.value > 1) estimatedPromo.value--;
}
</script>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  appearance: none;
  margin: 0;
}
input[type="number"] {
  @apply w-6 text-center;
}
.invalid-npt {
  border: 2px solid red;
}
input,
textarea {
  padding: 5px 7px;
}
.edit-task {
  @apply bg-slate-300;
}
.task-header {
  @apply flex justify-between;
}
.promodoros {
  @apply flex justify-center space-x-6;
}
.promodoros button {
  @apply bg-blue text-white px-2 py-0.5;
}
.task {
  @apply flex p-2 justify-between bg-blue text-white;
}
.edit-task-footer {
  @apply flex justify-end;
}
</style>
