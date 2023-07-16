<template lang="pug">
main
  AppHeader.appHeader(v-if ="!timerStore.focusMode")
  Timer
  SettingsModal(v-if="settingsStore.showSettingsModal")
  TasksModal(v-if="settingsStore.showTasksModal")
  AppNavigationBtns
  //- h1 {{ $log() }}
</template>

<script setup>
import AppHeader from "@/components/appHeader.vue";
import SettingsModal from "@/components/appSettings/settingModal.vue";
import TasksModal from "@/components/appTasks/tasksModal.vue";
import AppNavigationBtns from "../components/appNavigationBtns.vue";
import Timer from "../components/timer/timer.vue";

import { inject } from "vue";

import { useTasksStore } from "@/stores/tasks";
import { useSettingsStore } from "@/stores/settings";
import { useCounterStore } from "@/stores/timer";
import { onMounted } from "vue";

//stores
// onMounted(() => {
// const instance = getCurrentInstance();
//   inject("syncWithDB")();
// });
// const instance = getCurrentInstance();
// instance.$root.$log();

const settingsStore = useSettingsStore();
const tasksStore = useTasksStore();
const timerStore = useCounterStore();

//latest changes

// timerStore.$patch(JSON.parse(sessionStorage.getItem("user")));
// tasksStore.$patch(JSON.parse(sessionStorage.getItem("tasks")));
// settingsStore.$patch( JSON.parse(sessionStorage.getItem("settings")) );

//subscribing to the latest changes

// settingsStore.$subscribe(setData);
// timerStore.$subscribe(setData);
// tasksStore.$subscribe(setData);
// function setData(mutation, state) {
//  sessionStorage.setItem(mutation.storeId, JSON.stringify(state));
// }
</script>
<style scoped></style>
