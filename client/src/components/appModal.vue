<template lang="pug">
#modal-wrapper.fixed.w-screen.h-screen.top-0.left-0.z-10(@click.self="closeModal")
    slot(class="z-[200]").w-full.mx-auto.h-auto.relative
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
<style scoped>
#modal-wrapper {
  background-color: #0003;
  backdrop-filter: blur(10px);
}
</style>
