<template lang="pug">
TimerHeader(class="relative z-50").mt-4.text-primary
TimerBody.timer-body
.text-center.mb-5.-mt-4
  .text-xl.font-bold # {{ timerStore.sessionPomodoros }}
TimerFooter.my-1
AppNavigationBtns
TasksDrawer(class="hidden md:block")
MobileTasksModal(class="md:hidden")
SettingsModal(v-if="settingsStore.showSettingsModal")
AddTaskModal
AlarmAudio
</template>

<script setup>
import TimerBody from "@/components/appTimer/timerBody.vue";
import TimerFooter from "@/components/appTimer/timerFooter.vue";
import TimerHeader from "@/components/appTimer/timerHeader.vue";
import TasksDrawer from "@/components/appTasks/desktop/index.vue";
import MobileTasksModal from "@/components/appTasks/mobile/tasksList.vue";
import AddTaskModal from "@/components/appTasks/addTask.vue";
import AlarmAudio from "@/components/appTimer/AlarmAudio.vue";

import SettingsModal from "@/components/appSettings/settingModal.vue";
import AppNavigationBtns from "@/components/navigationBar/index.vue";

import { useSettingsStore } from "@/stores/settings";
import { useCounterStore } from "@/stores/timer";

const settingsStore = useSettingsStore();
const timerStore = useCounterStore();
</script>
