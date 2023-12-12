<template lang="pug">
.bars-container
  DesktopNavBar.desktopBar
  mobileBar.mobileBar
</template>

<script setup>
import DesktopNavBar from "./desktop.vue";
import mobileBar from "./mobile.vue";
</script>

<style lang="scss" scoped>
.bars-container {
  .desktopBar {
    @apply hidden md:block;
  }
  .mobileBar {
    @apply block md:hidden;
  }
}
</style>
