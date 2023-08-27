<template lang="pug">
.absolute-full-screen.flex-center.bg-tertiary
  .mt-10.relative.z-200.border-solid
    h1 {{ title }}
    slot
    span.absolute.top-0.right-10.cursor-pointer(@click='closeModal')
      Close
</template>

<script setup>
import { useSettingsStore } from "../stores/settings";
import Close from "./_icons/close.vue";
const settingsStore = useSettingsStore();
defineProps({
  title: { type: String },
});

function closeModal() {
  settingsStore.showSettingsModal = false;
}
</script>

<style scoped>
/* App models styling */
</style>
