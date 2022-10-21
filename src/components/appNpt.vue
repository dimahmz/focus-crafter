<template lang="pug">
.npt-container
  label(name="" for="") {{ nptLabel }}
  input(type="number" name="" v-model="nptValue")
  </template>

<script setup>
defineProps({
  nptValue: { type: String, required: true },
  nptLabel: { type: String, required: true },
});
</script>

<style scoped>
.npt-container {
  @apply flex flex-col space-y-2;
}
</style>
