<script setup>
import { ref } from "vue";
import { useTasksStore } from "@/stores/tasks";
import { storeToRefs } from "pinia";
const { addNewTaskModal } = storeToRefs(useTasksStore());

const loading = ref(false),
  open = ref(false);

const TasksStore = useTasksStore();

async function addNewTask(e) {
  e.preventDefault();

  const form = e.target;
  const task = {
    title: form["title"].value,
    estimatedPomodoros: form["estimatedPomodoros"].value,
    finishedPomodoros: 0,
    isSelected: false,
  };
  loading.value = true;
  const resp = await TasksStore.addTask(task);
  if (resp.success) {
    form["title"].value = "";
    form["estimatedPomodoros"].value = 4;
    open.value = true;
  }
  loading.value = false;
}
</script>

<template lang="pug">
v-snackbar(v-model="open" color="blue-grey") Task has been added!
  template(v-slot:actions)
    v-btn(color="pink" variant="text" @click="open = false") Close
v-dialog(v-model='addNewTaskModal' width='400px')
  form(@submit="addNewTask")
    v-card(title="Add task")
      .card-body
        .text-npt-container
          v-text-field(variant="outlined" name="title" placeholder="e.g : Reading a book" label="Task name" required)
        .number-npt-container
          label Rounds
          v-text-field(type="number" min="1" variant="outlined" name="estimatedPomodoros" :defaultvalue="4" )
      v-card-actions
        v-btn( variant="tonal" @click='addNewTaskModal = false') Cancel
        v-btn.create-btn( variant="tonal" type="submit" :loading="loading") Create
</template>

<style lang="scss" scoped>
.v-dialog {
  @apply max-w-lg;
  .v-card {
    @apply text-center;
    .v-card-title {
      @apply text-6xl font-semibold;
    }
    .card-body {
      @apply my-10 flex-column space-y-3 px-6;
    }
    .text-npt-container {
      @apply mx-auto w-full;
    }
    .number-npt-container {
      @apply flex-center-between space-x-4;
      .v-text-field {
        @apply w-[40px];
      }
    }
    .v-card-actions {
      @apply w-full mb-5 flex-center-between px-16;
      .v-btn {
        @apply px-6;
      }
      .create-btn {
        @apply bg-app-tertiary text-white;
      }
    }
  }
}
</style>
