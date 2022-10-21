<template lang="pug">
.modal-container
  .modal
    mHeader(modalName="Promodoro settings" @close-modal="closeTheModal")
    .Times-container
      AppNpt(nptLabel="promodoro"  nptValue=25)
      AppNpt(nptLabel="short break" nptValue=5)
      AppNpt(nptLabel="long break" nptValue=30)
    ChangeAset(setPhrase="auto start break")
</template>

<script setup>
import Alarm from "./alarm.vue";
import mHeader from "./modalHeader.vue";
import SetNpt from "./setNpt.vue";
import AppNpt from "../appNpt.vue";

import { useSettingsStore } from "@/stores/settings";
import ChangeAset from "./changeAset.vue";

const settingsStore = useSettingsStore();

function closeTheModal() {
  settingsStore.showModal = false;
}
</script>

<style scoped>
.modal-container {
  @apply w-full h-full absolute inset-0 p-4;
}
.modal {
  @apply relative max-w-xl bg-slate-300;
  /* z-index: 999; */
}

.Times-container {
  @apply flex justify-between space-x-3 overflow-hidden;
}
</style>
