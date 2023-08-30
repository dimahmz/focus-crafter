<template lang="pug">
.p-5
  .task-header
    a-input(v-model:value="newTaskName" placeholder="Task's name" id="npt")
  .flex-space-x-4
    h1 promodoros 
    a-input-number(v-model:value="estimatedPromo" :min="1")
  a-textarea(:rows=4 v-model:value="newTaskNote" placeholder="Description")
  .flex.justify-end
    AppBtn(@click="saveNewTask" label="Add")
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
  newTaskName.value = newTaskName.value.trim();
  if (newTaskName.value.length === 0) {
    npt.classList.add("invalid-npt");
    npt.focus();
    return;
  }
  tasksStore.addTask({
    title: newTaskName.value,
    notes: newTaskNote.value,
    estimatedPromodoros: estimatedPromo.value,
    finishedPromdoros: finishedPromo.value,
    isSelected: false,
    isFinished: false,
  });
  npt.classList.remove("invalid-npt");
  npt.focus();
  newTaskName.value = newTaskNote.value = "";
  estimatedPromo.value = 4;
}

function closeModal() {
  tasksStore.addNewTaskModal = false;
}
function decrement() {
  if (estimatedPromo.value > 1) estimatedPromo.value--;
}
</script>
<style scoped></style>
