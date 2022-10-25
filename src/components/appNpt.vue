<template lang="pug">
.npt-container
  label(name="" for="") {{ nptLabel }}
  input(type="number" name="" v-model="settingsStore[storeSet]")
  </template>

<script setup>
import { useSettingsStore } from "@/stores/settings";
const settingsStore = useSettingsStore();
const props = defineProps({
  nptValue: { required: true },
  nptLabel: { type: String },
  storeSet: { type: String, required: true },
});
</script>

<style scoped>
.npt-container {
  @apply flex flex-col space-y-2;
}
</style>
