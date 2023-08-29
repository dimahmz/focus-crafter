<template lang="pug">
a-button(type="primary") {{label}}
</template>

<script setup>
defineProps({ label: { type: String, required: true } });
</script>

<style>
.ant-btn {
  @apply bg-tertiary text-secondary border-none px-6 rounded-md;
}

.ant-btn:hover {
  @apply bg-tertiary/80;
}
.ant-btn:focus {
  @apply bg-tertiary;
}
</style>
