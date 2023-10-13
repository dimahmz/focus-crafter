<template lang="pug">
v-btn(:ripple="false") {{label}}
</template>

<script setup>
defineProps({ label: { type: String, required: true } });
</script>

<style></style>
