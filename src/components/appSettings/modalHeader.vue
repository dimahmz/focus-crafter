<template lang="pug">
header
  h2 {{modalName}}
  .grid.place-items-center
    closeBtn(@click="() => {settingsStore[setStore]=false}" )
hr.h-2
</template>

<script setup>
import closeBtn from "../_icons/close.vue";
import { useSettingsStore } from "@/stores/settings";

defineProps({
  modalName: { type: String, required: true },
  setStore: { type: String, required: true },
});
const settingsStore = useSettingsStore();
</script>

<style scoped>
header {
  @apply flex justify-around;
}
</style>
