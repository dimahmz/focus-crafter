<template lang="pug">
.navigation-bar
  .icons-container
    AddTaskBtn
    v-icon(icon="mdi-cog" @click='()=>settingsStore.showSettingsModal=true')
    router-link( :to="{ name: 'about' }")
      v-icon(icon="mdi-information")
    router-link(:to="userStore.state.loggedIn ? { name: 'profile' } : { name: 'login' }")
      v-icon(icon="mdi-account")
</template>

<script setup>
import AddTask from "@/components/appTasks/addTask.vue";
import AddTaskBtn from "@/components/appBtns/addTask.vue";

import { useCounterStore } from "@/stores/timer";
import { useSettingsStore } from "@/stores/settings";
import { useUserStore } from "@/stores/user";

const timer = useCounterStore();
const settingsStore = useSettingsStore();
const userStore = useUserStore();
</script>

<style lang="scss" scoped>
.navigation-bar {
  @apply fixed inset-0 pt-32 w-[80px] h-screen z-[100];
  .icons-container {
    @apply py-8 h-full flex space-y-4 rounded-tr-[50px];
  }
}
.icons-container {
  @apply w-full max-w-xs mx-auto flex justify-between items-center bg-app-secondary  px-3 py-4;
  @apply md:flex-column;
}
.icons-container svg {
  @apply stroke-app-tertiary fill-black;
}

.icons-container * {
  @apply cursor-pointer;
}
.router-link {
  @apply p-0 m-0;
}
</style>
