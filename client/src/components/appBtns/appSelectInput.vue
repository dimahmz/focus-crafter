<template lang="pug">
a-select(
  v-model:value="settingsStore.state.selectedAlarm"
  style="width: 120px")
  a-select-option(
    v-for="option in settingsStore._state.alarmSound" 
    :value="option.value"
    @click="$emit('change')"
  ) {{ option.text }}
</template>

<script setup>
import { useSettingsStore } from "@/stores/settings";
const settingsStore = useSettingsStore();
</script>

<style>
.ant-select {
  @apply border-red-900 border-solid;
}
.ant-select-selector {
  @apply border-red-900;
}
.ant-selector-focused {
  @apply border-quaternary;
}
.ant-select-item-option-active {
  @apply bg-quaternary;
}
.ant-select-item-option-selected {
  @apply bg-quaternary;
}
</style>
