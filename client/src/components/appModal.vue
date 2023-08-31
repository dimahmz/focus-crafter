<template lang="pug">
#modal-wrapper.fixed.w-screen.h-screen.top-0.left-0.overflow-auto(@click.self="closeModal" class="z-[100]")
  slot(class="z-[200] h-[300px]")
</template>

<script setup>
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
