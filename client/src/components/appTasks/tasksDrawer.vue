<script lang="ts" setup>
import { ref } from "vue";
const drawer = ref(false);
</script>

<template lang="pug">
.drawer-container
  .toggle-btn-container
    v-icon(icon="mdi-chevron-left-circle" size="x-large"  @click="()=> drawer = !drawer")
  .drawer(v-if="drawer")
</template>

<style scoped lang="scss">
.drawer-container {
  @apply absolute top-0 right-0 h-full;
  .drawer {
    @apply relative w-80 top-0  h-full border-l-[2px] border-app-quaternary;
  }
  .toggle-btn-container {
    @apply absolute inset-0 flex-center w-0;
    .v-icon {
      @apply m-0 p-0 -translate-x-1/2;
    }
  }
}
</style>
