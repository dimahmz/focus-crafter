<template lang="pug">
.grid-color
  .color(
      v-for="(color , i) in appColors"
      :key="i"
      :style="{ 'background-color': color.primaryColor }"
      @click="settingsStore.changeAppColor(color , timer)"
  )
</template>
    
  <script setup>
  import { appColors } from "@/assets/hex-colors";
  import { useSettingsStore } from "@/stores/settings";
  // import { ref } from 'vue';
  const settingsStore = useSettingsStore();
  const props = defineProps({
    timer: { type: String, required: true },
  });
  console.log(appColors);
  </script>
  
  <style scoped>
  .color{
    @apply w-5 h-5 rounded-sm bg-red-400;
  }
  .grid-color{
    @apply grid gap-4;
  }
  
  </style>
    