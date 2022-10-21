<template lang="pug">
section
 h2 {{setPhrase}}
 .npts-container
    slot(name="npt")
    slot(name="range-npt")
</template>

<script setup>
defineProps({
  setPhrase: { type: String, required: true },
});
</script>

<style scoped>
section {
  @apply flex justify-between;
}
.npts-container {
  @apply flex flex-col space-y-4;
}
</style>
