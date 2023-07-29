<template lang="pug">
section.modal-wrapper
  Exclamation
  h1 {{confirmation.message}}
  div
    button {{ confirmation.yesBtnMsg }}
    button {{ confirmation.noBtnMsg }}
</template>

<script setup>
import { useUserStore } from "../../stores/user";
import Exclamation from "../_icons/exclamation.vue";

const user = useUserStore().state;

defineProps({
  confirmation: {
    type: Object,
  },
});
function closeModal() {
  user.messageModal = false;
}
</script>

<style scoped>
.modal-wrapper {
  @apply bg-slate-100 rounded-sm w-full max-w-xs text-center;
}
</style>
