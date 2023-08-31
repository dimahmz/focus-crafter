<template lang="pug">
TimerHeader.mt-12.mb-10.text-primary
TimerBody.mb-10
TimerFooter
AppNavigationBtns.mt-32.w-full
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
