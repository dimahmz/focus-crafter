<template lang="pug">
header
  h2 {{modalName}}
  .grid.place-items-center
    closeBtn(@click="$emit('closeModal')")
hr.h-2
</template>

<script setup>
import closeBtn from "../_icons/close.vue";

defineProps({
  modalName: { type: String, required: true },
});
</script>

<style scoped>
header {
  @apply flex justify-around;
}
</style>
