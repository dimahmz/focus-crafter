<template lang="pug">
.relative.pt-1
  label(for='MusicVolume') {{nptLabel}}
  input#MusicVolume(type='range' min=0 max=100 v-model="settingsStore[storeSet]" @click="$emit('change')")
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
input {
  @apply appearance-none w-full h-1 p-0 bg-white focus:outline-none focus:ring-0 focus:shadow-none;
}
</style>
