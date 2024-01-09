<script setup>
import { useTasksStore } from "@/stores/tasks";
import { storeToRefs } from "pinia";

const { addNewTaskModal } = storeToRefs(useTasksStore());
</script>

<template lang="pug">
button(@click='()=>addNewTaskModal=true')
  v-icon(icon="mdi-plus")
</template>

<style scoped lang="scss">
button {
  @apply bg-app-tertiary text-white font-bold p-2 rounded-full;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    @apply bg-app-tertiary/80;
  }
}
</style>
