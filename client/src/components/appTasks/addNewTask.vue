<template lang="pug">
.bg-secondary.py-4.px-3.relative.mt-20.m-auto(class="max-w-[400px]")
  .flex-column.space-y-4
    .flex-center-between
      span.cursor-pointer(@click='closeNewTaskModal')
        LeftArrow 
      .text-center Tasks
      span.cursor-pointer(@click='closeModal')
        Close
    .task-header
      a-input( v-model:value="newTaskTitle" placeholder="Task's title" id="npt")
    .flex.space-x-16
      div
        h1 Pomodoros 
        a-input-number(v-model:value="estimatedPomo" :min="1")
      div
        h1 Completed
        a-input-number(v-model:value="completedPomo" :min="1")
    h1 Notes
    a-textarea(:rows=4 v-model:value="newTaskNote" placeholder="Add some notes!")
  .flex.justify-between.mt-4(v-if="updateTask")
    AppBtn(label="Delete" @click="()=> tasksStore.deleteTask(ndx)") Delete
    .flex-gap-x-8
      AppBtn(label="Discard" @click="()=> tasksStore.tasks[ndx].showEditModal = tasksStore.editTaskModal = false")
      AppBtn(label="Save" @click="savechangedTask")
  .flex.justify-end.mt-4(v-else)
    AppBtn(@click="saveNewTask" label="Add")
</template>

<script setup>
import Close from "../_icons/close.vue";
import LeftArrow from "../_icons/arrow_left.vue";
import { useTasksStore } from "../../stores/tasks";
import { useSettingsStore } from "../../stores/settings";
import { ref, onMounted } from "vue";
import AppBtn from "../appBtns/appBtn.vue";
import AppNpt from "../appBtns/appNpt.vue";

const tasksStore = useTasksStore();
const settingsStore = useSettingsStore();
const props = defineProps({
  Task: {
    type: Object,
    default: {
      title: "",
      notes: "",
      estimatedPomodoros: 4,
      completedPomodoros: 0,
    },
  },
  ndx: {
    type: Number,
    default: -1,
  },
  updateTask: { type: Boolean, default: false },
});

let npt = null;
onMounted(() => {
  npt = document.getElementById("npt");
  npt.focus();
});

const newTaskTitle = ref(props.Task.title),
  newTaskNote = ref(props.Task.notes),
  completedPomo = ref(props.Task.completedPomodoros),
  estimatedPomo = ref(props.Task.estimatedPomodoros);

function saveNewTask() {
  newTaskTitle.value = newTaskTitle.value.trim();
  if (newTaskTitle.value.length === 0) {
    npt.classList.add("invalid-npt");
    npt.focus();
    return;
  }
  tasksStore.addTask({
    title: newTaskTitle.value,
    notes: newTaskNote.value,
    estimatedPomodoros: estimatedPomo.value,
    completedPomodoros: completedPomo.value,
    isSelected: false,
    isFinished: false,
  });
  npt.classList.remove("invalid-npt");
  npt.focus();
  newTaskTitle.value = newTaskNote.value = "";
  estimatedPomo.value = 4;
}

function closeModal() {
  settingsStore.showAddNewTaskModal = settingsStore.showTasksModal = false;
}
function closeNewTaskModal() {
  settingsStore.showAddNewTaskModal = false;
  // settingsStore.showTasksModal = true;
}
function decrement() {
  if (estimatedPomo.value > 1) estimatedPomo.value--;
}
</script>
