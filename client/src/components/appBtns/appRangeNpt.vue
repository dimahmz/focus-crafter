<template lang="pug">
.change-volume-container
  label(for='MusicVolume') {{nptLabel}}
  a-slider#MusicVolume(v-model:value="settingsStore.state[storeSet]" @afterChange="()=>$emit('change')")
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
.ant-slider {
  @apply w-28;
}
</style>
