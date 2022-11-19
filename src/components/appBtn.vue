<template lang="pug">
a-button(type="primary") {{name}}
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  textColor: { type: String, required: true },
  bgColor: { type: String, required: true },
});
</script>

<style scoped></style>
