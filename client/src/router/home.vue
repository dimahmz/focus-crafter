<template lang="pug">
TimerHeader.mt-6.mb-50.text-primary
TimerBody.timer-body
.text-center.mb-8
  .text-xl.font-bold # {{ timerStore.sessionPomodoros }}
TimerFooter.my-1
AppNavigationBtns
TasksDrawer(class="hidden md:block")
MobileTasksModal(class="md:hidden")
SettingsModal(v-if="settingsStore.showSettingsModal")
AddTaskModal
</template>

<script setup>
import TimerBody from "@/components/appTimer/timerBody.vue";
import TimerFooter from "@/components/appTimer/timerFooter.vue";
import TimerHeader from "@/components/appTimer/timerHeader.vue";
import TasksDrawer from "@/components/appTasks/desktop/index.vue";
import MobileTasksModal from "@/components/appTasks/mobile/tasksList.vue";
import AddTaskModal from "@/components/appTasks/addTask.vue";

import SettingsModal from "@/components/appSettings/settingModal.vue";
import AppNavigationBtns from "../components/navigationBar/index.vue";

import { useSettingsStore } from "@/stores/settings";
import { useCounterStore } from "@/stores/timer";

const settingsStore = useSettingsStore();
const timerStore = useCounterStore();
</script>

<style lang="scss" scoped>
.timer-body {
  @apply mt-10 sm:mt-8 md:mt-1;
}
</style>
