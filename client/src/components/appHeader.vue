<template lang="pug">
section.app-header.text-app-secondary
  .title-container
    h1.title {{content.pomodoro}}
</template>

<script setup></script>

<style scoped>
.app-header {
  @apply mt-7 mb-10;
}
.title {
  @apply text-center text-4xl font-semibold m-0;
}
</style>
