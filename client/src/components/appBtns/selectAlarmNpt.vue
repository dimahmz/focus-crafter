<template lang="pug">
v-select(
  :items="settingsStore._state.alarmSound"
  v-model="settingsStore.state.timer.selectedAlarm" 
  item-title="text" 
  item-value="value"
  variant="solo-inverted"
  style="width: 120px;" 
)
</template>

<script setup>
import { useSettingsStore } from "@/stores/settings";
const settingsStore = useSettingsStore();
</script>
