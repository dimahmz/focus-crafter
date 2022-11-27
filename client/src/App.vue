<template lang="pug">
main
  AppHeader.header(v-show="!timerStore.focusMode")
  TimerBtns.timerBtns
  Footerbtns.footerbtns(v-show="!timerStore.focusMode")
  SettingsModal(v-if="settingsStore.showSettingsModal")
  TasksModal(v-if="settingsStore.showTasksModal")
</template>

<script setup>
import TimerBtns from "./components/timer/timerBtns.vue";
import AppHeader from "./components/timer/appHeader.vue";
import Footerbtns from "./components/timer/footerbtns.vue";
import SettingsModal from "./components/appSettings/settingModal.vue";
import TasksModal from "./components/appTasks/tasksModal.vue";
// import AddNewTask from "./components/appTasks/addNewTask.vue";

import { useTasksStore } from "./stores/tasks";
import { useSettingsStore } from "./stores/settings";
import { useCounterStore } from "./stores/timer";
//stores

const tasksStore = useTasksStore();
const settingsStore = useSettingsStore();
const timerStore = useCounterStore();

//latest changes

timerStore.$patch(JSON.parse(localStorage.getItem("counter")));
tasksStore.$patch(JSON.parse(localStorage.getItem("tasks")));
settingsStore.$patch(JSON.parse(localStorage.getItem("settings")));

//subscribing to the latest changes

settingsStore.$subscribe(setData);
timerStore.$subscribe(setData);
tasksStore.$subscribe(setData);
function setData(mutation, state) {
  localStorage.setItem(mutation.storeId, JSON.stringify(state));
}

</script>
<style scoped>
.header {
  @apply mt-4 mb-10;
}
.timerBtns {
  @apply mb-16;
}
</style>
