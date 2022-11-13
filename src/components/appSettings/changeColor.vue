<template lang="pug">
section
  h1 Select a color
  .timers-colors
    .selected-promodoro-color.color(@click="diplayThePallete('promodoro')")
    .selected-short-break-color.color(@click="diplayThePallete('shortBreak')")
    .selected-long-break-color.color(@click="diplayThePallete('longBreak')")
  colorsPallete.colors-palette(
    v-if="settingsStore.state.diplayPallete"
    :timer="selectedTimer"
  )
 
</template>
  
<script setup>
import colorsPallete from "./colorsPallete.vue"
import { useSettingsStore } from "@/stores/settings";
import { appColors } from "@/assets/hex-colors";
import { ref } from 'vue';
components:{"colorsPallet"}

// colo
const settingsStore = useSettingsStore();

const promodoroColors=ref(settingsStore.promodoroBgColor),
      longBreakColors=ref(settingsStore.longBreakBgColor),
      shortBreakColors=ref(settingsStore.shortBreakBgColor);  

const selectedTimer=ref("promodoro");

function diplayThePallete(timer){
  selectedTimer.value=timer;
  settingsStore.state.diplayPallete=true
}
</script>

<style scoped>
section{
  @apply relative flex space-x-40 ;
}
.timers-colors{
  @apply flex space-x-5 justify-between;
}
.color{
  @apply w-5 h-5 rounded-sm;
}

.colors-palette{
  @apply absolute w-full bottom-0;

}
.selected-promodoro-color{
  background-color: v-bind('settingsStore.promodoroBgColor');
}
.selected-short-break-color{
  background-color: v-bind('settingsStore.shortBreakBgColor');
  
} 
.selected-long-break-color{
  background-color: v-bind('settingsStore.longBreakBgColor');

}
</style>
  