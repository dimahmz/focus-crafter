<template lang="pug">
section
 h2.title {{setPhrase}}
 .npts-container
    slot(name="aNpt")
    slot
</template>

<script setup>
defineProps({
  setPhrase: { type: String },
});
</script>

<style scoped>
section {
  @apply my-1 flex justify-between items-center;
}
.npts-container {
  @apply flex space-x-3 items-center;
}
/* .title {
} */
</style>
