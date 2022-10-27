<template lang="pug">
section
 h2 {{setPhrase}}
 .npts-container
    slot(name="select")
    slot(name="range-npt")
    slot(name="npt")
    slot(name="checkBox")
    slot(name="switchBtn")
</template>

<script setup>
defineProps({
  setPhrase: { type: String },
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
