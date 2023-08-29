<template lang="pug">
#modal-wrapper.fixed.w-screen.h-screen.inset-0.z-10.flex(@click.self="closeModal")
  div(class="z-[200] max-w-[600px]").overflow-y-auto.mx-auto
    slot
</template>

<script setup>
import Close from "./_icons/close.vue";
import { useSettingsStore } from "../stores/settings";
const settingsStore = useSettingsStore();
const props = defineProps({
  modalStoreSet: { type: String },
});

function closeModal() {
  settingsStore[props.modalStoreSet] = false;
}
</script>
<style>
body {
  @apply overflow-hidden;
}
#modal-wrapper {
  background-color: #0003;
  backdrop-filter: blur(10px);
}
</style>
