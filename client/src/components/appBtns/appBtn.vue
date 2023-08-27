<template lang="pug">
a-button(type="primary") {{name}}
</template>

<script setup>
defineProps({ name: { type: String, required: true } });
</script>
