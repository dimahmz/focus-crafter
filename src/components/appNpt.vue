<template lang="pug">
.npt-container
  label(name="" for="") {{ nptLabel }}
  input(type="number" min="1"  name="" v-model="settingsStore[storeSet]")
  </template>

<script setup>
import { useSettingsStore } from "@/stores/settings";
const settingsStore = useSettingsStore();
const props = defineProps({
  nptLabel: { type: String },
  storeSet: { type: String, required: true },
  maxValue: { type: Number },
});
</script>

<style scoped>
.npt-container {
  @apply flex flex-col space-y-2;
}
</style>
