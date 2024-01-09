<template lang="pug">
.drawer-container
  .toggle-btn-container
    v-icon(icon="mdi-chevron-left-circle" size="x-large"  @click="()=> drawer = !drawer")
  .drawer(v-if="drawer").px-3.py-5.overflow-auto
    TasksHeader
    TasksList
</template>

<script lang="ts" setup>
import { ref } from "vue";
import TasksHeader from "./tasksHeader.vue";
import TasksList from "./tasksList.vue";

const drawer = ref(false);
</script>

<style scoped lang="scss">
.drawer-container {
  @apply absolute top-0 right-0 h-full;
  .drawer {
    @apply relative w-80 top-0  h-full border-l-[2px] border-app-quaternary;
  }
  .toggle-btn-container {
    @apply absolute inset-0 flex-center w-0;
    .v-icon {
      @apply m-0 p-0 -translate-x-1/2;
    }
  }
}
</style>
