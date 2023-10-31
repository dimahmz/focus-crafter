<template lang="pug">
TimerHeader.mt-8.mb-50.text-primary
TimerBody
TimerFooter.my-4
.absolute.bottom-3.w-full
  AppNavigationBtns.mt-8.w-full
SettingsModal(v-if="settingsStore.showSettingsModal")
TasksModal(v-if="settingsStore.showTasksModal")
</template>

<script setup>
import TimerBody from "../components/appTimer/timerBody.vue";
import TimerFooter from "../components/appTimer/timerFooter.vue";
import TimerHeader from "../components/appTimer/timerHeader.vue";

import SettingsModal from "@/components/appSettings/settingModal.vue";
import TasksModal from "@/components/appTasks/tasksModal.vue";
import AppNavigationBtns from "../components/appNavigationBtns.vue";

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
// stored in the local storage
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
