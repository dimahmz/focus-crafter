<template lang="pug">
.edit-task
  .task-header
    a-input(v-model:value="newTaskName" placeholder="what are you working on?" id="npt")
      .grid.place-items-center
        closeBtn(@click="closeModal")
  .promodoros
    h1 promodoros 
      a-input-number(v-model:value="estimatedPromo" :min="1")
  .notes-conatiner
    a-textarea(:rows=4 v-model:value="newTaskNote" placeholder="add notes")
  .edit-task-footer
    .other-btns
      a-button(type="primary" @click="closeModal") Cancel
      a-button(type="primary" @click="saveNewTask") Add
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
      title: " ",
      notes: " ",
      estimatedPromodoros: 4,
      finishedPromdoros: 0,
    },
  },
});

let npt = null;
onMounted(() => {
  npt = document.getElementById("npt");
  npt.focus();
});

const newTaskName = ref(props.thisTask.title),
  newTaskNote = ref(props.thisTask.notes),
  finishedPromo = ref(props.thisTask.finishedPromdoros),
  estimatedPromo = ref(props.thisTask.estimatedPromodoros);

function saveNewTask() {
  if (newTaskName.value.length === 0) {
    npt.classList.add("invalid-npt");
    return;
  }
  tasksStore.addTask({
    title: newTaskName.value,
    notes: newTaskNote.value,
    estimatedPromodoros: estimatedPromo.value,
    finishedPromdoros: finishedPromo.value,
  });
  npt.classList.remove("invalid-npt");
  npt.focus();
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
