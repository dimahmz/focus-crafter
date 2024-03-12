<template lang="pug">
.change-volume-container
  v-slider(
    v-model="settingsStore.state.timer[storeSet]"
    :min="0" :max="1"
    tick-size="4"
    track-size="4"
    thumb-size="17"
   )
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

<style scoped lang="scss">
.change-volume-container {
  @apply w-full;
  .v-slider {
    @apply w-40;
  }
}
</style>
