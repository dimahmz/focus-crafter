<template lang="pug">
header.flex.justify-around
  h2 {{modalName}}
  .grid.place-items-center
    closeBtn(@click="closeModal")
</template>

<script setup>
import closeBtn from "../_icons/close.vue";
import { useSettingsStore } from "@/stores/settings";

defineProps({
  modalName: { type: String, required: true },
  setStore: { type: String, required: true },
});
const settingsStore = useSettingsStore();
function closeModal() {
  settingsStore[setStore] = false;
  settingsStore.saveToDataBase();
}
</script>
