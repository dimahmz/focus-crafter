<template lang="pug">
section.modal-wrapper
  h1 {{response.title}}
  div
    span.flex-center(v-if="response.errorLevel > 0")
      ErrorIcon
    span(v-else).bg-gray-800.flex-center
      Select
  p {{response.description}}
  button(@click="closeModal") {{conten.confirm}}
</template>

<script setup>
import { onMounted } from "vue";
import { useUserStore } from "../../stores/user";

import ErrorIcon from "../_icons/error_icon.vue";
import Select from "../_icons/selected.vue";
import content from "@/content/labels.json";

const user = useUserStore().state;
const response = user.serverResponse;
onMounted(() => {
  document.body.style.overflow = "hidden";
});

function closeModal() {
  user.messageModal = false;
  document.body.style.overflow = "auto";
}
</script>

<style scoped>
.modal-wrapper {
  @apply bg-slate-100 rounded-sm w-full max-w-xs text-center;
}
</style>
