<template lang="pug">
select(v-model="settingsStore.selectedAlarm")
  option(
    v-for="option in settingsStore.alarmSound" 
    :value="option.value"
    @click="$emit('change')"
  ) {{ option.text }}
</template>

<script setup>
import { useSettingsStore } from "@/stores/settings";
const settingsStore = useSettingsStore();
</script>

<style scoped>
section {
  @apply flex justify-between;
}
.npts-container {
  @apply flex flex-col space-y-4;
}
</style>
