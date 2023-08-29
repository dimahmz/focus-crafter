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

<style>
.ant-slider-rail {
  @apply bg-secondary;
}
.ant-slider-handle:focus {
  @apply border-quaternary;
  box-shadow: none;
}
.ant-slider-rail:hover {
  @apply bg-secondary !important;
}
.ant-slider-rail:hover {
  @apply bg-secondary;
}
.ant-slider-handle {
  @apply bg-tertiary border-2 border-secondary w-4 h-4;
}
.ant-slider-track {
  @apply bg-tertiary;
}
.ant-slider-track:hover .ant-slider-track:focus {
  background-color: none;
}
.ant-slider {
  @apply w-28;
}
</style>
