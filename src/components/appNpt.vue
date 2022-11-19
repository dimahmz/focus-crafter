<template lang="pug">
.npt-container
  label(for="inputNumber") {{ nptLabel }}
  a-input-number(id="inputNumber" v-model:value="settingsStore.state[storeSet]" :min="1")
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
